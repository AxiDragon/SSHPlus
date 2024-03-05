chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'reload') {
        location.reload();
    }
});