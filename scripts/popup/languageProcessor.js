import { languageDatabase } from "./languageDatabase.js";

export async function initLanguageProcessor() {
    let language = await getLanguage();

    translatePage(language);
}

function translatePage(language) {
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    elementsToTranslate.forEach(element => {
        const translationKey = element.getAttribute('data-translate');
        const translatedText = languageDatabase[language][translationKey];
        element.innerHTML += translatedText;
    });

    const titlesToTranslate = document.querySelectorAll('[title-translate]');
    titlesToTranslate.forEach(element => {
        const translationKey = element.getAttribute('title-translate');
        const translatedText = languageDatabase[language][translationKey];
        element.setAttribute('title', translatedText);
    });
}

async function getLanguage() {
    let url = await getUrl();

    if (url.includes('/en')) {
        return 'en';
    }

    return 'nl';
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