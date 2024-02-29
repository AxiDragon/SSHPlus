let currentPage = '';

setInterval(() => {
    //deals with SPA
    if (currentPage !== window.location.href) {
        currentPage = window.location.href;
        document.dispatchEvent(new CustomEvent('hrefChanged', { detail: { href: window.location.href } }));
    }
}, 250);

function checkLoaded(condition, ifLoaded) {
    const checkLoaded = setInterval(() => {
        if (condition()) {
            clearInterval(checkLoaded);
            clearTimeout(timeOut);
            ifLoaded();
        }
    }, 50);

    const timeOut = setTimeout(() => {
        clearInterval(checkLoaded);
    }, 5000);
}

function isCorrectUrl(url, urlArray) {
    return urlArray.some(offerUrl => url.includes(offerUrl));
}