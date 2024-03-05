const propertyUrls = ['https://www.sshxl.nl/nl/aanbod', 'https://www.sshxl.nl/en/rental-offer/long-stay'];

let checkedPropertyTags;
chrome.runtime.sendMessage({ message: 'get', key: 'checkedPropertyTags' }, function (response) {
    checkedPropertyTags = response.checkedPropertyTags || [];

    if (isCorrectUrl(window.location.href, offerUrls)) {
        savePropertyUrl(window.location.href);
    }
});

document.addEventListener('hrefChanged', (e) => {
    if (isCorrectUrl(e.detail.href, propertyUrls)) {
        checkLoaded(isVisitTrackerLoaded, initVisitTracker)
    }
    if (isCorrectUrl(e.detail.href, offerUrls)) {
        if (checkedPropertyTags !== undefined) {
            savePropertyUrl(e.detail.href);
            return;
        }

        chrome.runtime.sendMessage({ message: 'get', key: 'checkedPropertyTags' }, function (response) {
            checkedPropertyTags = response.checkedPropertyTags || [];
            savePropertyUrl(e.detail.href);
        });
    }
});

function isVisitTrackerLoaded() {
    const propertyDivs = document.getElementsByClassName('card--property');
    return propertyDivs.length > 0;
}

function initVisitTracker() {
    const propertyDivs = document.getElementsByClassName('card--property');
    const markedProperties = [];

    for (let i = 0; i < propertyDivs.length; i++) {
        if (processOffer(propertyDivs[i])) {
            markedProperties.push(propertyDivs[i]);
        }
    }

    for (let i = 0; i < markedProperties.length; i++) {
        markedProperties[i].parentNode.appendChild(markedProperties[i]);
    }

    initPropertyFilter();
}

function processOffer(propertyDiv) {
    const propertyUrl = propertyDiv.querySelector('a').href;
    const propertyTag = propertyUrl.split('/').pop();

    if (checkedPropertyTags.includes(propertyTag)) {
        markAsVisited(propertyDiv);
        return true;
    }

    return false;
}

function markAsVisited(propertyDiv) {
    const statusText = document.createElement('div');
    statusText.classList.add('price-tag', 'tag--m');
    statusText.innerText = seenText.getTranslation();
    statusText.style = `background: #fff;
    color: #6f2282;
    border-radius: 2px;
    font-weight: 500;
    letter-spacing: .4px;
    text-transform: uppercase;
    z-index: 2;
    position: absolute;
    left: 20px;
    font-family: "Work Sans", "Work Sans-fallback", Arial, sans-serif;`

    propertyDiv.querySelector('.card__header').appendChild(statusText);
    propertyDiv.querySelector('.card__image').style.opacity = '.35';
}

function savePropertyUrl(url) {
    const propertyTag = url.split('/').pop();

    if (!checkedPropertyTags.includes(propertyTag)) {
        checkedPropertyTags.push(propertyTag);
        chrome.runtime.sendMessage({ message: 'set', key: 'checkedPropertyTags', value: checkedPropertyTags });
    }
}