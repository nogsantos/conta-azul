import { autoinject, bindable, bindingMode } from 'aurelia-framework';
import { Router } from "aurelia-router";
/**
 * Listagem de veículos
 * 
 * @export
 * @class VeiculosListagem
 */
@autoinject()
export class VeiculosListagem {
    /**
     * CDI
     * 
     * 
     * @memberof VeiculosListagem
     */
    constructor(
        private subrouter: Router,
    ) { }
    /**
     * Formulário para cadastro de um novo item
     * 
     * 
     * @memberof VeiculosListagem
     */
    novo() {
        this.subrouter.navigateToRoute('VeiculosCadastrar');
    }

}
