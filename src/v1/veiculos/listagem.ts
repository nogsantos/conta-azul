import { autoinject, bindable, bindingMode } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { VeiculosModel } from "./model";
import { Veiculo } from "./veiculo";
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
            console.log(resolve);
            this.veiculos = resolve.rows;
        });
    }
    /**
     * Formulário para cadastro de um novo item
     * 
     * 
     * @memberof VeiculosListagem
     */
    novo() {
        // this.veiculo = new Veiculo();
        // this.veiculo._id = new Date().toISOString();
        // this.veiculo.combustivel = "Flex";
        // this.veiculo.imagem = "null";
        // this.veiculo.marca = "Volkswagem";
        // this.veiculo.modelo = "Gol";
        // this.veiculo.placa = "FFF-5498";
        // this.veiculo.valor = 20000
        // this.db.create(this.veiculo);
        this.subrouter.navigateToRoute('VeiculosCadastrar');
    }

    add() {

    }

    show() {

    }

}
