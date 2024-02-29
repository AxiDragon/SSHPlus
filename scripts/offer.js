document.addEventListener('hrefChanged', () => window.checkLoaded(isLoaded, init));

function isLoaded() {
    const iconList = document.getElementsByClassName('list--iconed');

    if (iconList === undefined || iconList.length === 0) {
        return false;
    }

    console.log(iconList.length);
    //if the icon list is not length 5, the page is not loaded or the user is not logged in
    //it shouldn't be greater than 5, but it's a failsafe
    return iconList[0].getElementsByTagName('li').length >= 5;
}

function init() {
    const detailList = document.getElementsByClassName('list--iconed')[0];

    const details = detailList.getElementsByTagName('li');
    positionText = details[details.length - 1];

    const numberText = positionText.innerText.replace(/\D/g, '');
    positionText.innerHTML = positionText.innerHTML.replace(numberText, '<b>' + numberText + '</b>');

    const position = parseInt(numberText);
    positionText.querySelector('b').style.color = window.getPositionColor(position);
}