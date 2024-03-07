import { reload } from "./reloader.js";

let hideSeenProperties;

export function initSeenPropertyHider() {
    hideSeenProperties = document.getElementById('hide-seen-properties');
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