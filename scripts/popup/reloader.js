import { isOnSSH } from "./onSSHChecker.js";

export async function reload() {
    let onSSH = await isOnSSH();
    if (!onSSH) {
        return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length === 0) {
            return;
        }

        chrome.tabs.sendMessage(tabs[0].id, { message: 'reload' });
    });
}