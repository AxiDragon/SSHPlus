class Translation {
    constructor(english, dutch) {
        this.en = english;
        this.nl = dutch;
    }

    getTranslation() {
        return this[language];
    }
}

const loadingText = new Translation('The reaction is loading... Just a moment!', 'De reactie wordt geladen... Heel even geduld!');
const seenText = new Translation('Seen', 'Gezien');
const selfContainedAccomodationText = new Translation('Self-contained accommodation', 'Een zelfstandige woning');

const noPreferenceText = new Translation('No preference', 'Geen voorkeur');
const femaleText = new Translation('Female', 'Vrouw');
const maleText = new Translation('Male', 'Man');
const genderMismatchText = new Translation('This room is not searching for your gender.', 'Deze kamer is niet op zoek naar jouw gender.');

let language = getLanguage();

document.addEventListener('hrefChanged', (e) => {
    language = getLanguage();
});


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