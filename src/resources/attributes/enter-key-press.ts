import { customAttribute, inject } from 'aurelia-framework';

@customAttribute('enter-key-press')
@inject(Element)
export class EnterKeyPress {
    element: Element;
    value: Function;
    enterPressed: (e: KeyboardEvent) => void;

    constructor(element) {
        this.element = element;
        this.enterPressed = e => {
            let key = e.which || e.keyCode;
            if (key === 13) {
                this.value();
            }
        };
    }

    attached() {
        this.element.addEventListener('keypress', this.enterPressed);
    }

    detached() {
        this.element.removeEventListener('keypress', this.enterPressed);
    }
}
