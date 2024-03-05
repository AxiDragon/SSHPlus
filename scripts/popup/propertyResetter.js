const resetPropertyButton = document.getElementById('reset-property');

export function initPropertyResetter() {
    resetPropertyButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length === 0) {
                return;
            }

            chrome.tabs.sendMessage(tabs[0].id, { message: 'wipeProperties' });
        });
    });
}