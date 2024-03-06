export class Dropdown {
    constructor(name) {
        this.keyName = name + 'Displayed';
        this.header = document.getElementById(name + '-header');
        this.content = document.getElementById(name + '-container');
        this.arrow = document.getElementById(name + '-arrow');

        this.displayed = true;

        this.init();
    }

    init() {
        chrome.storage.sync.get([this.keyName], (result) => {
            if (result[this.keyName] === undefined) {
                result[this.keyName] = true;
            }

            this.displayed = result[this.keyName];

            //force the arrow to rotate instantly
            this.arrow.style.transition = 'none';

            this.updateDisplay();

            this.arrow.offsetHeight;
            this.arrow.style.transition = '';
        });

        this.header.addEventListener('click', () => {
            this.displayed = !this.displayed;

            chrome.storage.sync.set({ [this.keyName]: this.displayed });

            this.updateDisplay();
        });
    }

    updateDisplay() {
        if (this.displayed) {
            this.content.style.display = 'block';
            this.arrow.style.transform = 'rotate(0deg) translate(0, -3px)';
        }
        else {
            this.content.style.display = 'none';
            this.arrow.style.transform = 'rotate(-90deg)';
        }
    }
}