let currentPage = '';

setInterval(() => {
    //deals with SPA
    if (currentPage !== window.location.href) {
        currentPage = window.location.href;
        document.dispatchEvent(new Event('hrefChanged'));
    }
}, 500);

function checkLoaded(condition, ifLoaded) {
    const checkLoaded = setInterval(() => {
        if (condition()) {
            clearInterval(checkLoaded);
            clearTimeout(timeOut);
            ifLoaded();
        }
    }, 100);

    const timeOut = setTimeout(() => {
        clearInterval(checkLoaded);
    }, 5000);
}

window.checkLoaded = checkLoaded;