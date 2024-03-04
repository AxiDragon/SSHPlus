chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'wipeProperties') {
        localStorage.removeItem('checkedPropertyTags');
        location.reload();
    }
});