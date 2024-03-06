let hideConsolationCard;

chrome.storage.sync.get(['hideConsolationCard'], function (result) {
    if (result.hideConsolationCard === undefined) {
        result.hideConsolationCard = true;
    }

    hideConsolationCard = result.hideConsolationCard;
});

function initConsolationCardHider() {
    if (!hideConsolationCard) {
        return;
    }

    const card = document.querySelector('.card--empty');
    card.style.display = 'none';
}