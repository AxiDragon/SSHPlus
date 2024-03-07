import { reload } from "./reloader.js";

let hideConsolationCard;

export function initConsolationCardHider() {
    hideConsolationCard = document.getElementById('hide-consolation-card');

    recoverSave();
    initializeListeners();
}

function initializeListeners() {
    hideConsolationCard.addEventListener('change', sortModeChanged);
}

function recoverSave() {
    chrome.storage.sync.get(['hideConsolationCard'], function (result) {
        if (result.hideConsolationCard === undefined) {
            result.hideConsolationCard = false;
        }

        hideConsolationCard.checked = result.hideConsolationCard;
    });
}

function sortModeChanged() {
    chrome.storage.sync.set({ hideConsolationCard: hideConsolationCard.checked }, reload);
}