const offerUrls = ["https://www.sshxl.nl/en/rental-offer/long-stay/", "https://www.sshxl.nl/nl/aanbod/"];
document.addEventListener('hrefChanged', (e) => {
    if (isCorrectUrl(e.detail.href, offerUrls)) {
        window.checkLoaded(isOfferLoaded, initOffer)
    }
});

function isOfferLoaded() {
    const iconList = document.getElementsByClassName('list--iconed');

    if (iconList === undefined || iconList.length === 0) {
        return false;
    }

    //if the icon list is not length 5, the page is not loaded or the user is not logged in
    //it shouldn't be greater than 5, but it's a failsafe
    return iconList[0].getElementsByTagName('li').length >= 5;
}

function initOffer() {
    const detailList = document.getElementsByClassName('list--iconed')[0];

    const details = detailList.getElementsByTagName('li');
    positionText = details[details.length - 1];

    const numberText = positionText.innerText.replace(/\D/g, '');
    positionText.innerHTML = positionText.innerHTML.replace(numberText, '<b>' + numberText + '</b>');

    const position = parseInt(numberText);
    positionText.style.color = window.getPositionColor(position);
}