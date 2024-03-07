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

    const linksToTranslate = document.querySelectorAll('[href-translate]');
    linksToTranslate.forEach(element => {
        const translationKey = element.getAttribute('href-translate');
        const translatedText = languageDatabase[language][translationKey];
        element.setAttribute('href', translatedText);
    });
}

async function getLanguage() {
    let language = await getLanguageFromStorage();

    if (language !== 'site') {
        //override language
        return language;
    }

    let url = await getUrl();

    if (!url.includes('https://www.sshxl.nl/')) {
        //not on SSH
        return 'en';
    }

    if (url.includes('/en')) {
        return 'en';
    }

    return 'en';
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

async function getLanguageFromStorage() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('language', function (data) {
            if (data.language === undefined) {
                data.language = 'site';
            }

            resolve(data.language);
        });
    });
}