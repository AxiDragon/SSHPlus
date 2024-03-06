//called by visitTracker.js
function initDateSorter() {
    const propertyDivs = document.getElementsByClassName('card--property');
    const datedProperties = [];

    for (let i = 0; i < propertyDivs.length; i++) {
        if (propertyDivs[i].style.display === 'none') {
            continue;
        }

        datedProperties.push(getDatedProperty(propertyDivs[i]));
    }

    sortProperties(datedProperties);
}

function getDatedProperty(propertyDiv) {
    //assign an insane value to assure that any other cards are sorted last
    let timeLeft = 99999;

    let dateText = propertyDiv.querySelector('.card__footer').querySelector('p').innerText;
    dateText = dateText.replace('  ', ' '); //remove any double spaces. cause they exist, apparently
    const words = dateText.split(' ');
    const numbers = words.filter(word => !isNaN(word));

    if (numbers.length === 1) {
        //only hours are given
        timeLeft = parseInt(numbers[0]);
    }
    else if (numbers.length === 2) {
        //days and hours are given
        timeLeft = parseInt(numbers[0]) * 24 + parseInt(numbers[1]);
    }

    console.log(propertyDiv);
    console.log(timeLeft);

    return {
        property: propertyDiv,
        timeLeft: timeLeft //in hours
    };
}

function sortProperties(datedProperties) {
    datedProperties.sort((a, b) => a.timeLeft - b.timeLeft);

    for (let i = 0; i < datedProperties.length; i++) {
        datedProperties[i].property.parentNode.appendChild(datedProperties[i].property);
    }
}