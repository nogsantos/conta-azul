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
    @bindable current_page: number = 1;
    @bindable total_items: number;
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
        this.db.fetch().then(response => {
            this.total_items = response.total_rows;
            if (response.rows.length > 0) {
                this.veiculos = response.rows;
            } else {
                this.seed();
            }
        }).catch(err => {
            console.log(err);
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
     * Editar um veículo
     * 
     * @param {any} id 
     * 
     * @memberof VeiculosListagem
     */
    editar(veiculo: any) {        
        this.subrouter.navigateToRoute('VeiculosEditar', {id: `${veiculo}`});
    }
    /**
     * Preenche o formulário com os valores iniciais
     * 
     * 
     * @memberof VeiculosListagem
     */
    seed() {
        this.db.batch(seed).then(result => {
            this.db.fetch().then(resolve => {
                this.veiculos = resolve.rows;
            });
        }).catch(error => {
            alert("Desculpe, alguns erros ocorreram")
            console.log(error);
        });
    }
    /**
     * Paginação para listagem
     * 
     * @param {any} newVal 
     * @param {any} oldVal 
     * 
     * @memberof VeiculosListagem
     */
    current_pageChanged(newVal, oldVal) {
        let offset: number = 0;
        offset = ((newVal * 5) - 5);
        this.db.fetch(offset).then(response => {
            if (response.rows.length > 0) {
                this.veiculos = response.rows;
            }
        }).catch(err => {
            console.log(err);
        });
    }
}
