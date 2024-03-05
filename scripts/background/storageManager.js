chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === 'get') {
        chrome.storage.sync.get(request.key, function (result) {
            sendResponse(result);
        });

        return true;
    }

    if (request.message === 'set') {
        chrome.storage.sync.set({ [request.key]: request.value }, function () {
            console.log('Set ' + request.key + ' to ' + request.value);
        });

        return true;
    }
});
