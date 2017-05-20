import { autoinject, bindable, bindingMode } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { VeiculosModel } from "./model";
import { Veiculo } from "./veiculo";
import seed from "./seed";
import * as $ from 'jquery';
/**
 * Listagem de veículos
 * 
 * @export
 * @class VeiculosListagem
 */
@autoinject()
export class VeiculosListagem {
    /*
     * Obj 
     */
    @bindable private veiculos: Veiculo;
    @bindable private veiculo: Veiculo;
    /*
     * paginação
     */
    @bindable current_page: number = 1;
    @bindable total_items: number;
    /*
     * Tooltip 
     */
    trigger = 'none';
    text = '<p><b>Dica</b></p>Para editar, basta apenas um clique duplo na linha do item desejado.'
    /*     
     * Check
     */
    @bindable toggle_check;
    @bindable private master_is_checked: boolean;
    @bindable select_exclusao: string[] = [];
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
     * Elements binding
     */
    bind() {
        this.db.fetch().then(response => {
            this.total_items = response.total_rows;
            if (response.rows.length > 0) {
                this.veiculos = response.rows;
            } else {
                this.trigger = 'mouseover';
                this.seed();
            }
        }).catch(err => {
            console.log(err);
        });
        /*
         * Habilita o check
         */
        this.master_is_checked = false;
        this.checkToggle();
    }
    /**
     * Checkbox toggle
     * 
     * 
     * @memberof VeiculosListagem
     */
    checkToggle() {
        $(this.toggle_check).on('click', () => {
            if (this.master_is_checked) {
                this.master_is_checked = false;
                $(':checkbox.checkitem').prop('checked', false);
                this.popItens();
                return;
            }
            this.master_is_checked = true;
            $(':checkbox.checkitem').prop('checked', true);
        })​;
    }
    /**
     * Limpa o array de itens para exclusão
     * 
     * 
     * @memberof VeiculosListagem
     */
    popItens() {
        if (this.select_exclusao.length > 0) {
            this.select_exclusao.pop();
        }
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
        this.subrouter.navigateToRoute('VeiculosEditar', { id: `${veiculo}` });
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
        this.master_is_checked = false;
        this.checkToggle();
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
    /**
     * Exclusão dos itens selecionados
     * 
     * 
     * @memberof VeiculosListagem
     */
    excluir() {
        $(':checkbox.checkitem').prop('checked', (posicao, is_checked) => {
            if (is_checked) {
                $(':checkbox.checkitem').prop('defaultValue', (pos, val) => {
                    if (posicao === pos) {
                        this.select_exclusao.push(val);
                    }
                });
            }
        });
        let para_exclusao = [];
        this.select_exclusao.forEach(val => {
            para_exclusao.push(JSON.parse(val));
        })
        this.db.batch(para_exclusao).then(result => {
            this.db.fetch().then(response => {
                this.master_is_checked = false;
                this.total_items = response.total_rows;
                this.veiculos = response.rows;                
            });
        }).catch(error => {
            console.log(error);
        });
    }
}
