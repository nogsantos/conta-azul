import { bindable, inject, noView, customAttribute } from 'aurelia-framework';
import * as $ from 'jquery';
import 'jquery.maskedinput';
/**
 * Máscara para o telefone
 */
@customAttribute('placa')
@bindable('value')
@noView()
@inject(Element)
export class PhoneFormat {
    private element: Element; 

    constructor(element) {
        this.element = element;
    }

    attached() {
        let self = this;
        $(self.element).mask('aaa-9999');
    }
}
