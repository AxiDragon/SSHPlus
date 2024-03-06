import { reload } from "./reloader.js";

const genderFilterHeading = document.getElementById('gender-filter-heading');
const genderFilterArrow = document.getElementById('gender-filter-arrow');
const genderFilterContainer = document.getElementById('gender-filter-container');
let displayed;

const enableCheckbox = document.getElementById('enable-gender-filter');
const genderFilterSettings = document.getElementById('gender-filter-settings');
const genderFilterMode = document.getElementById('gender-filter-mode');

const genderCheckboxes = genderFilterSettings.querySelectorAll(':scope input[type="checkbox"]');

export function initGenderFilter() {
    recoverSave();
    initializeListeners();
}

function initializeListeners() {
    genderFilterHeading.addEventListener('click', function () {
        console.log('clicked!');

        displayed = !displayed;

        chrome.storage.sync.set({ genderFilterDisplayed: displayed });

        updateDisplay();
    });

    enableCheckbox.addEventListener('change', enableCheckboxChanged);
    genderFilterMode.addEventListener('change', filterModeChanged);

    for (const checkbox of genderCheckboxes) {
        checkbox.addEventListener('change', function () {
            updateSelectedGenders();
        });
    }
}

function recoverSave() {
    chrome.storage.sync.get(['genderFilterDisplayed'], function (result) {
        if (result.genderFilterDisplayed === undefined) {
            result.genderFilterDisplayed = true;
        }

        displayed = result.genderFilterDisplayed;

        //force the arrow to rotate instantly
        genderFilterArrow.style.transition = 'none';

        updateDisplay();

        genderFilterArrow.offsetHeight;
        genderFilterArrow.style.transition = '';
    });

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

    chrome.storage.sync.get(['selectedgenders'], function (result) {
        if (result.selectedgenders === undefined) {
            result.selectedgenders = [];
        }

        for (const checkbox of genderCheckboxes) {
            checkbox.checked = result.selectedgenders.includes(checkbox.value);
        }
    });
}

function updateDisplay() {
    if (displayed) {
        genderFilterContainer.style.display = 'block';
        genderFilterArrow.style.transform = 'rotate(0deg) translate(0, -3px)';
    }
    else {
        genderFilterContainer.style.display = 'none';
        genderFilterArrow.style.transform = 'rotate(-90deg)';
    }
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