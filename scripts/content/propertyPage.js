const propertyUrls = ['https://www.sshxl.nl/nl/aanbod', 'https://www.sshxl.nl/en/rental-offer/long-stay'];

document.addEventListener('hrefChanged', (e) => {
    if (isCorrectUrl(e.detail.href, propertyUrls)) {
        checkLoaded(isPropertyPageLoaded, initPropertyPage)
    }
});

function isPropertyPageLoaded() {
    const propertyDivs = document.getElementsByClassName('card--property');
    return propertyDivs.length > 0;
}

function initPropertyPage() {
    initConsolationCardHider();
    initCityFilter();
    initDateSorter();
    initVisitTracker();
}