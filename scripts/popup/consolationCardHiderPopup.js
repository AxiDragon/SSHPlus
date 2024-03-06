import { reload } from "./reloader.js";

const hideConsolationCard = document.getElementById('hide-consolation-card');

export function initHideConsolationCard() {
    recoverSave();
    initializeListeners();
}

function initializeListeners() {
    hideConsolationCard.addEventListener('change', sortModeChanged);
}

function recoverSave() {
    chrome.storage.sync.get(['hideConsolationCard'], function (result) {
        if (result.hideConsolationCard === undefined) {
            result.hideConsolationCard = true;
        }

        hideConsolationCard.value = result.hideConsolationCard;
    });
}

function sortModeChanged() {
    chrome.storage.sync.set({ hideConsolationCard: hideConsolationCard.value }, reload);
}