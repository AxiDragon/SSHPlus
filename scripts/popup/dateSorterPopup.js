import { Dropdown } from "./dropDown.js";
import { reload } from "./reloader.js";

new Dropdown('date-sorter');

const dateSorterMode = document.getElementById('date-sorter-mode');

export function initDateSorter() {
    recoverSave();
    initializeListeners();
}

function initializeListeners() {
    dateSorterMode.addEventListener('change', sortModeChanged);
}

function recoverSave() {
    chrome.storage.sync.get(['dateSorterMode'], function (result) {
        if (result.dateSorterMode === undefined) {
            result.dateSorterMode = 'ascending';
        }

        dateSorterMode.value = result.dateSorterMode;
    });
}

function sortModeChanged() {
    chrome.storage.sync.set({ dateSorterMode: dateSorterMode.value }, reload);
}