import { reload } from './reloader.js';

const resetPropertyButton = document.getElementById('reset-property');

export function initPropertyResetter() {
    resetPropertyButton.addEventListener('click', () => {
        chrome.storage.sync.remove('checkedPropertyTags', function () {
            console.log('Cleared checkedPropertyTags');
            reload();
        });
    });
}