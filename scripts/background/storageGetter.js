chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === 'getCityFilter') {
        chrome.storage.sync.get(['cityFilterEnabled', 'cityFilterMode', 'selectedCities'], function (result) {
            sendResponse({
                enabled: result.cityFilterEnabled || false,
                mode: result.cityFilterMode,
                selected: result.selectedCities
            });
        });

        return true;
    }
});