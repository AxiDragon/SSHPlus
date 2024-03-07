import { reload } from './reloader.js';

let resetPropertyButton;

export function initPropertyResetter() {
    resetPropertyButton = document.getElementById('reset-property');

    resetPropertyButton.addEventListener('click', () => {
        chrome.storage.sync.remove('checkedPropertyTags', function () {
            console.log('Cleared checkedPropertyTags');
            reload();
        });
    });
}