import { Dropdown } from "./dropDown.js";
import { reload } from "./reloader.js";

let enableCheckbox;
let cityFilterSettings;
let cityFilterMode;
let cityCheckboxes;

export function initCityFilter() {
    new Dropdown('city-filter');

    getElements();
    recoverSave();
    initializeListeners();
}

function getElements() {
    enableCheckbox = document.getElementById('enable-city-filter');
    cityFilterSettings = document.getElementById('city-filter-settings');
    cityFilterMode = document.getElementById('city-filter-mode');
    cityCheckboxes = cityFilterSettings.querySelectorAll(':scope input[type="checkbox"]');
}

function initializeListeners() {
    console.log(enableCheckbox);
    enableCheckbox.addEventListener('change', () => {
        console.log(enableCheckbox);
        enableCheckboxChanged();
    });
    cityFilterMode.addEventListener('change', filterModeChanged);

    for (const checkbox of cityCheckboxes) {
        checkbox.addEventListener('change', function () {
            updateSelectedCities();
        });
    }
}

function recoverSave() {
    chrome.storage.sync.get(['cityFilterEnabled'], function (result) {
        if (result.cityFilterEnabled === undefined) {
            result.cityFilterEnabled = false;
        }

        enableCheckbox.checked = result.cityFilterEnabled;

        if (enableCheckbox.checked) {
            cityFilterSettings.style.display = 'block';
        } else {
            cityFilterSettings.style.display = 'none';
        }
    });

    chrome.storage.sync.get(['cityFilterMode'], function (result) {
        if (result.cityFilterMode === undefined) {
            result.cityFilterMode = 'exclude';
        }

        cityFilterMode.value = result.cityFilterMode;
    });

    chrome.storage.sync.get(['selectedCities'], function (result) {
        if (result.selectedCities === undefined) {
            result.selectedCities = [];
        }

        for (const checkbox of cityCheckboxes) {
            checkbox.checked = result.selectedCities.includes(checkbox.value);
        }
    });
}

function updateSelectedCities() {
    const selectedCities = Array.from(cityCheckboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

    chrome.storage.sync.set({ selectedCities: selectedCities }, reload);
}

function filterModeChanged() {
    chrome.storage.sync.set({ cityFilterMode: cityFilterMode.value }, reload);
}

function enableCheckboxChanged() {
    chrome.storage.sync.set({ cityFilterEnabled: enableCheckbox.checked }, reload);

    if (enableCheckbox.checked) {
        cityFilterSettings.style.display = 'block';
    } else {
        cityFilterSettings.style.display = 'none';
    }
}