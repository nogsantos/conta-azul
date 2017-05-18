import { autoinject, bindable, bindingMode } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { VeiculosModel } from "./model";
import { Veiculo } from "./veiculo";
import seed from "./seed";
/**
 * Listagem de veículos
 * 
 * @export
 * @class VeiculosListagem
 */
@autoinject()
export class VeiculosListagem {
    @bindable private veiculos: Veiculo;
    @bindable private veiculo: Veiculo;
    /**
     * CDI
     * 
     * 
     * @memberof VeiculosListagem
     */
    constructor(
        private subrouter: Router,
        private db: VeiculosModel
    ) { }
    /**
     * 
     */
    bind() {
        this.db.fetch().then(resolve => {
            if (resolve.rows.length > 0) {
                this.veiculos = resolve.rows;
            } else {
                this.seed();
            }
        });        
    }    
    /**
     * Formulário para cadastro de um novo item
     * 
     * 
     * @memberof VeiculosListagem
     */
    novo() {        
        this.subrouter.navigateToRoute('VeiculosCadastrar');
    }
    /**
     * Preenche o formulário com os valores iniciais
     * 
     * 
     * @memberof VeiculosListagem
     */
    seed() {
        seed.forEach(veiculo => {
            this.db.create(veiculo);
        });
        this.db.fetch().then(resolve => {
            this.veiculos = resolve.rows;
        });
    }

}
