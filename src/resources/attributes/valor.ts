import { autoinject, customAttribute, bindable } from 'aurelia-framework';
import * as $ from 'jquery';
import 'jquery-maskmoney';
/**
 * Máscara para o valores monetários R$
 */
@customAttribute('valor')
@autoinject()
export class CurrencyFormat {

    constructor(
        @bindable private element: Element
    ) { }

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
