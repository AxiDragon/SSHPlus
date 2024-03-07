import { Dropdown } from "./dropDown.js";
import { reload } from "./reloader.js";

let enableCheckbox;
let genderFilterSettings;
let genderFilterMode;

let genderCheckboxes;

export function initGenderFilter() {
    new Dropdown('gender-filter');

    getElements();
    recoverSave();
    initializeListeners();
}

function getElements() {
    enableCheckbox = document.getElementById('enable-gender-filter');
    genderFilterSettings = document.getElementById('gender-filter-settings');
    genderFilterMode = document.getElementById('gender-filter-mode');
    genderCheckboxes = genderFilterSettings.querySelectorAll(':scope input[type="checkbox"]');
}

function initializeListeners() {
    enableCheckbox.addEventListener('change', enableCheckboxChanged);
    genderFilterMode.addEventListener('change', filterModeChanged);

    for (const checkbox of genderCheckboxes) {
        checkbox.addEventListener('change', function () {
            updateSelectedGenders();
        });
    }
}

function recoverSave() {
    chrome.storage.sync.get(['genderFilterEnabled'], function (result) {
        if (result.genderFilterEnabled === undefined) {
            result.genderFilterEnabled = false;
        }

        enableCheckbox.checked = result.genderFilterEnabled;

        if (enableCheckbox.checked) {
            genderFilterSettings.style.display = 'block';
        } else {
            genderFilterSettings.style.display = 'none';
        }
    });

    chrome.storage.sync.get(['genderFilterMode'], function (result) {
        if (result.genderFilterMode === undefined) {
            result.genderFilterMode = 'exclude';
        }

        genderFilterMode.value = result.genderFilterMode;
    });

    chrome.storage.sync.get(['selectedGenders'], function (result) {
        if (result.selectedGenders === undefined) {
            result.selectedGenders = [];
        }

        console.log(result.selectedGenders);
        for (const checkbox of genderCheckboxes) {
            console.log(checkbox.value);
            checkbox.checked = result.selectedGenders.includes(checkbox.value);
        }
    });
}

function updateSelectedGenders() {
    const selectedGenders = Array.from(genderCheckboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

    chrome.storage.sync.set({ selectedGenders: selectedGenders }, reload);
}

function filterModeChanged() {
    chrome.storage.sync.set({ genderFilterMode: genderFilterMode.value }, reload);
}

function enableCheckboxChanged() {
    chrome.storage.sync.set({ genderFilterEnabled: enableCheckbox.checked }, reload);

    if (enableCheckbox.checked) {
        genderFilterSettings.style.display = 'block';
    } else {
        genderFilterSettings.style.display = 'none';
    }
}