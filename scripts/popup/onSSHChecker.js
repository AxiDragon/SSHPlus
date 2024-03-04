export async function isOnSSH() {
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