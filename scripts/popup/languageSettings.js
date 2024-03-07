let languageSelector;

export function initLanguageSettings() {
    languageSelector = document.getElementById('language-selector');

    chrome.storage.sync.get('language', function (data) {
        if (data.language === undefined) {
            data.language = 'site';
        }

        languageSelector.value = data.language;

        languageSelector.addEventListener('change', function () {
            chrome.storage.sync.set({ language: languageSelector.value }, function () {
                location.reload();
            });
        });
    });
}