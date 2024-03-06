import { reload } from "./reloader.js";

const hideSeenProperties = document.getElementById('hide-seen-properties');

export function initSeenPropertyHider() {
    recoverSave();
    initializeListeners();
}

function initializeListeners() {
    hideSeenProperties.addEventListener('change', hideSeenPropertiesChanged);
}

function recoverSave() {
    chrome.storage.sync.get(['hideSeenProperties'], function (result) {
        if (result.hideSeenProperties === undefined) {
            result.hideSeenProperties = false;
        }

        hideSeenProperties.checked = result.hideSeenProperties;
    });
}

function hideSeenPropertiesChanged() {
    chrome.storage.sync.set({ hideSeenProperties: hideSeenProperties.checked }, reload);
}