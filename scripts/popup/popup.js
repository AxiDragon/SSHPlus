import { isOnSSH } from "./onSSHChecker.js";
import { initPropertyResetter } from "./propertyResetter.js";
import { initCityFilter } from "./cityFilterPopup.js";
import { initGenderFilter } from "./genderFilterPopup.js";
import { initDateSorter } from "./dateSorterPopup.js";
import { initConsolationCardHider } from "./consolationCardHiderPopup.js";

import { initOtherSettings } from "./otherSettingsPopup.js";
import { initSeenPropertyHider } from "./seenPropertyHiderPopup.js";
import { initLanguageProcessor } from "./languageProcessor.js";

const settings = document.getElementById('settings');

init();

async function init() {
    let onSSH = await isOnSSH();

    if (!onSSH) {
        settings.style.display = 'none';
        const helpDiv = document.createElement('div');
        helpDiv.innerHTML = 'Go to <a target="_blank" href="https://www.sshxl.nl">SSH</a> to edit settings!';
        document.body.appendChild(helpDiv);
        return;
    }

    await initLanguageProcessor();

    initCityFilter();
    initGenderFilter();
    initDateSorter();

    initOtherSettings();
    initConsolationCardHider();
    initSeenPropertyHider();

    initPropertyResetter();
}