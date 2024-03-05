chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'wipeProperties') {
        localStorage.removeItem('checkedPropertyTags');
        location.reload();
    }

    if (request.message === 'reload') {
        console.log('reloading');
        location.reload();
    }
});