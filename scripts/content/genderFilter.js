let genderFilter;

chrome.runtime.sendMessage({ message: 'get', key: ['genderFilterEnabled', 'genderFilterMode', 'selectedGenders'] }, function (response) {
    genderFilter = {
        enabled: response.genderFilterEnabled || false,
        mode: response.genderFilterMode,
        selected: generateSelectedGenderArray(response.selectedGenders)
    };
});

document.addEventListener('hrefChanged', (e) => {
    if (isCorrectUrl(e.detail.href, offerUrls)) {
        window.checkLoaded(isGenderFilterLoaded, initGenderFilter)
    }
});

function isGenderFilterLoaded() {
    const specs = document.getElementsByClassName('specs__section');

    if (specs === undefined || specs.length === 0) {
        return false;
    }

    return specs.length >= 5;
}

function initGenderFilter() {
    if (isSelfContainedAccommodation()) {
        return;
    }

    const specs = document.getElementsByClassName('specs__section');
    const genderPreference = specs[4].querySelector('.list__value').innerText;

    if (!isMatchingGender(genderPreference)) {
        //this property is not for you
        const genderMismatchDiv = document.createElement('div');
        genderMismatchDiv.style.fontWeight = 'bold';
        genderMismatchDiv.style.color = 'red';
        genderMismatchDiv.innerHTML = genderMismatchText.getTranslation();

        const pageHeaderContent = document.querySelector('.pageheader__content');
        pageHeaderContent.insertBefore(genderMismatchDiv, pageHeaderContent.firstChild);
    }
}

function generateSelectedGenderArray(selectedGenders) {
    if (selectedGenders === undefined) {
        return;
    }

    const selected = [];

    for (const gender of selectedGenders) {
        switch (gender) {
            case 'No preference':
                selected.push(noPreferenceText);
                break;
            case 'Male':
                selected.push(maleText);
                break;
            case 'Female':
                selected.push(femaleText);
                break;
        }
    }

    return selected;
}

function isMatchingGender(genderPreference) {
    let matchesSelection = genderFilter.selected.some(gender => gender.getTranslation() === genderPreference);

    return genderFilter.mode === 'exclude' ? !matchesSelection : matchesSelection;
}

function isSelfContainedAccommodation() {
    //because each offer can be a little funky,
    //we're just going to check every list value for a match
    const values = document.getElementsByClassName('list__value');

    for (const value of values) {
        if (value.innerText === selfContainedAccomodationText.getTranslation()) {
            return true;
        }
    }

    return false;
}