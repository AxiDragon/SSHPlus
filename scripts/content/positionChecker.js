const softPositionThreshold = 15;
const positionThreshold = 25;

function getPositionColor(position) {
    if (position > positionThreshold) {
        return 'red';
    }
    else if (position > softPositionThreshold) {
        return '#ff4000';
    }
    else {
        return 'green';
    }
}

window.getPositionColor = getPositionColor;