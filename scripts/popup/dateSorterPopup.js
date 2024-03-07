import { Dropdown } from "./dropDown.js";
import { reload } from "./reloader.js";

let dateSorterMode;

export function initDateSorter() {
    new Dropdown('date-sorter');

    dateSorterMode = document.getElementById('date-sorter-mode');
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