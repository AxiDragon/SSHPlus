let cityFilter;

chrome.runtime.sendMessage({ message: 'get', key: ['cityFilterEnabled', 'cityFilterMode', 'selectedCities'] }, function (response) {
    cityFilter = {
        enabled: response.cityFilterEnabled || false,
        mode: response.cityFilterMode || 'exclude',
        selected: response.selectedCities || []
    };
});

//called by visitTracker.js
//cityFilter should be gotten from storage before this function is called
//cause of SSH's loading time this should be fine
function initCityFilter() {
    if (!cityFilter.enabled)
        return;

    const propertyDivs = document.getElementsByClassName('card--property');
    const filteredProperties = [];

    for (let i = 0; i < propertyDivs.length; i++) {
        if (shouldFilterProperty(propertyDivs[i])) {
            filteredProperties.push(propertyDivs[i]);
        }
    }

    for (let i = 0; i < filteredProperties.length; i++) {
        filteredProperties[i].style.display = 'none';
    }
}

function shouldFilterProperty(propertyDiv) {
    const propertyTitle = propertyDiv.querySelector('.card__title').innerText;
    const propertyCity = propertyTitle.split(' ').pop();

    const inFilter = cityFilter.selected.includes(propertyCity);

    return cityFilter.mode === 'exclude' ? inFilter : !inFilter;
}