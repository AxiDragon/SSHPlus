let cityFilter;

chrome.runtime.sendMessage({ message: 'getCityFilter' }, function (response) {
    cityFilter = response;
});

//called by visitTracker.js
//cityFilter should be gotten from storage before this function is called
//cause of SSH's loading time this should be fine
function initPropertyFilter() {
    if (!cityFilter.enabled)
        return;

    const propertyDivs = document.getElementsByClassName('card--property');
    const filteredProperties = [];

    for (let i = 0; i < propertyDivs.length; i++) {
        console.log(propertyDivs[i]);
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

    console.log(cityFilter.mode, inFilter, propertyCity, cityFilter.selected, propertyTitle);

    return cityFilter.mode === 'exclude' ? inFilter : !inFilter;
}