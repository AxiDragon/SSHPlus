import { initPropertyResetter } from "./propertyResetter.js";
import { initCityFilter } from "./cityFilterPopup.js";
import { initGenderFilter } from "./genderFilterPopup.js";
import { initDateSorter } from "./dateSorterPopup.js";
import { initConsolationCardHider } from "./consolationCardHiderPopup.js";

import { initOtherSettings } from "./otherSettingsPopup.js";
import { initSeenPropertyHider } from "./seenPropertyHiderPopup.js";
import { initLanguageSettings } from "./languageSettings.js";

import { initLanguageProcessor } from "./languageProcessor.js";

init();

async function init() {
    await initLanguageProcessor();

    initLanguageSettings();

    initCityFilter();
    initGenderFilter();
    initDateSorter();

    initOtherSettings();
    initConsolationCardHider();
    initSeenPropertyHider();

    initPropertyResetter();
}