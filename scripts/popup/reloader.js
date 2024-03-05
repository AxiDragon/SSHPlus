export function reload() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length === 0) {
            return;
        }

        chrome.tabs.sendMessage(tabs[0].id, { message: 'reload' });
    });
}