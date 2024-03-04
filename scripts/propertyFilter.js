let propertyFilter = ['Zwolle', 'Rotterdam', 'Tilburg', 'Groningen'];
let mode = 'exclude'; // 'include' or 'exclude' 

console.log('Property filter loaded');

//called by visitTracker.js
function initPropertyFilter() {
    console.log('init property filter');

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

    const inFilter = propertyFilter.includes(propertyCity);

    return mode === 'exclude' ? inFilter : !inFilter;
}
