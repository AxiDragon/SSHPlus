import { reload } from "./reloader.js";

const cityFilterHeading = document.getElementById('city-filter-heading');
const cityFilterArrow = document.getElementById('city-filter-arrow');
const cityFilterContainer = document.getElementById('city-filter-container');
let displayed;

const cityFilterSettings = document.getElementById('city-filter-settings');
const enableCheckbox = document.getElementById('enable-city-filter');
const filterMode = document.getElementById('filter-mode');

const cityCheckboxes = cityFilterSettings.querySelectorAll(':scope input[type="checkbox"]');

let initialized = false;

export function initCityFilter() {
    recoverSave();
    initializeListeners();

    initialized = true;
}

function initializeListeners() {
    cityFilterHeading.addEventListener('click', function () {
        displayed = !displayed;

        chrome.storage.sync.set({ cityFilterDisplayed: displayed });

        updateDisplay();
    });

    enableCheckbox.addEventListener('change', enableCheckboxChanged);
    filterMode.addEventListener('change', filterModeChanged);

    for (const checkbox of cityCheckboxes) {
        checkbox.addEventListener('change', function () {
            updateSelectedCities();
        });
    }
}

function recoverSave() {
    chrome.storage.sync.get(['cityFilterDisplayed'], function (result) {
        if (result.cityFilterDisplayed === undefined) {
            result.cityFilterDisplayed = true;
        }

        displayed = result.cityFilterDisplayed;

        //force the arrow to rotate instantly
        cityFilterArrow.style.transition = 'none';

        updateDisplay();

        cityFilterArrow.offsetHeight;
        cityFilterArrow.style.transition = '';
    });

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

        filterMode.value = result.cityFilterMode;
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

function tryReload() {
    if (initialized) {
        reload();
    }
}

function updateDisplay() {
    if (displayed) {
        cityFilterContainer.style.display = 'block';
        cityFilterArrow.style.transform = 'rotate(0deg) translate(0, -3px)';
    }
    else {
        cityFilterContainer.style.display = 'none';
        cityFilterArrow.style.transform = 'rotate(-90deg)';
    }
}

function updateSelectedCities() {
    const selectedCities = Array.from(cityCheckboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

    chrome.storage.sync.set({ selectedCities: selectedCities }, function () {
        tryReload();
    });
}

function filterModeChanged() {
    chrome.storage.sync.set({ cityFilterMode: filterMode.value }, function () {
        tryReload();
    });
}

function enableCheckboxChanged() {
    chrome.storage.sync.set({ cityFilterEnabled: enableCheckbox.checked }, function () {
        tryReload();
    });

    if (enableCheckbox.checked) {
        cityFilterSettings.style.display = 'block';
    } else {
        cityFilterSettings.style.display = 'none';
    }
}