class Translation {
    constructor(english, dutch) {
        this.en = english;
        this.nl = dutch;
    }

    getTranslation(language) {
        return this[language];
    }
}

const language = getLanguage();

const loadingText = new Translation('The reaction is loading... Just a moment!', 'De reactie wordt geladen... Heel even geduld!');

const replyUrls = ["https://www.sshxl.nl/en/mijn-ssh/applications", "https://www.sshxl.nl/nl/mijn-ssh/reacties"];
document.addEventListener('hrefChanged', (e) => {
    if (isCorrectUrl(e.detail.href, replyUrls)) {
        checkLoaded(isRepliesLoaded, initReplies);
    }
});

function isRepliesLoaded() {
    const positionTexts = document.getElementsByClassName('teaser__desc');

    if (positionTexts.length > 0) {
        for (let i = 0; i < positionTexts.length; i++) {
            if (positionTexts[i].innerText !== loadingText.getTranslation(language)) {
                return true;
            }
        }
    }

    return false;
}

function initReplies() {
    const positionTexts = document.getElementsByClassName('teaser__desc');

    for (let i = 0; i < positionTexts.length; i++) {
        processPosition(positionTexts[i]);
    }
}

function processPosition(positionDiv) {
    if (isReactionClosed(positionDiv)) {
        positionDiv.style.color = 'gray';
        return;
    }

    const positionParagraph = positionDiv.querySelector('p');
    const positionText = positionParagraph.querySelector('em');
    const position = parseInt(positionText.innerText);

    positionParagraph.style.color = window.getPositionColor(position);
}

function isReactionClosed(positionDiv) {
    let element = positionDiv;

    while (element) {
        if (element.classList && element.classList.contains('teaser--reaction-closed')) {
            return true;
        }
        element = element.parentNode;
    }
    return false;
}

function getLanguage() {
    // document.documentElement.lang seems to work inconsistently, dunno why ¯\_(ツ)_/¯

    const url = window.location.href;

    if (url.includes('/nl')) {
        return 'nl';
    }
    if (url.includes('/en')) {
        return 'en';
    }

    console.log('Language not found');
    return 'nl';
}