const settings = document.getElementById('settings');
const resetPropertyButton = document.getElementById('reset-property');

init();

async function init() {
    let onSSH = await isOnSSH();

    if (!onSSH) {
        settings.innerHTML = 'Go to <a target="_blank" href="https://www.sshxl.nl">SSH</a> to edit settings!';
        return;
    }

    resetPropertyButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length === 0) {
                return;
            }
            chrome.tabs.sendMessage(tabs[0].id, { action: 'wipeProperties' });
        });
    });
}

async function isOnSSH() {
    let currentUrl = await getUrl();
    return currentUrl.includes('https://www.sshxl.nl/');
}

async function getUrl() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length === 0) {
                reject('No tabs');
            }

            resolve(tabs[0].url);
        });
    });
}