import { autoinject, customAttribute,bindable } from 'aurelia-framework';
import * as $ from 'jquery';
import 'jquery.maskedinput';
/**
 * Máscara para o telefone
 */
@customAttribute('placa')
@autoinject()
export class PhoneFormat {

    constructor(
        @bindable private element: Element
    ) { }

    bind() {
        let self = this;
        $(self.element).mask('aaa-9999');        
    }
}
