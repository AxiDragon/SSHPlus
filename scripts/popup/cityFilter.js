const cityFilter = document.getElementById('city-filter');
const enableCheckbox = document.getElementById('enable-city-filter');
const filterMode = document.getElementById('filter-mode');
const cityCheckboxes = cityFilter.querySelectorAll(':scope input[type="checkbox"]');

export function initCityFilter() {
    initializeListeners();
    recoverSave();
}

function initializeListeners() {
    enableCheckbox.addEventListener('change', enableCheckboxChanged);
    filterMode.addEventListener('change', filterModeChanged);

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
        enableCheckboxChanged();
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

function updateSelectedCities() {
    const selectedCities = Array.from(cityCheckboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

    chrome.storage.sync.set({ selectedCities: selectedCities });
}

function filterModeChanged() {
    chrome.storage.sync.set({ cityFilterMode: filterMode.value });
}

function enableCheckboxChanged() {
    chrome.storage.sync.set({ cityFilterEnabled: enableCheckbox.checked });

    if (enableCheckbox.checked) {
        cityFilter.style.display = 'block';
    } else {
        cityFilter.style.display = 'none';
    }
}