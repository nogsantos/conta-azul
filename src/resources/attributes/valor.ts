import { bindable, inject, noView, customAttribute } from 'aurelia-framework';
import * as $ from 'jquery';
import 'jquery-maskmoney';
/**
 * Máscara para o valores monetários R$
 */
@customAttribute('valor')
@bindable('value')
@noView()
@inject(Element)
export class CurrencyFormat {
    private element: Element; 

    constructor(element) {
        this.element = element;
    }

    attached() {
        let self = this;        
        $(self.element).maskMoney({
            symbol: 'R$ ',
            showSymbol: true,
            thousands: '.',
            decimal: ',',
            symbolStay: true
        });
    }
}
