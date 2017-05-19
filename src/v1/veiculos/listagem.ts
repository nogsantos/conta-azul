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
    toggle_check;
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
        this.checkToggle();
    }
    /**
     * Checkbox toggle
     * 
     * 
     * @memberof VeiculosListagem
     */
    checkToggle() {
        $(this.toggle_check).click(event => {
            event.stopPropagation();
            $(':checkbox.checkitem').prop('checked', (posicao, valor) => {
                if (!this.toggle_check.checked) {
                    $(':checkbox.checkitem').prop('checked', false);
                    this.popItens();
                    return;
                }
                $(':checkbox.checkitem').prop('checked', true);
                return;
            });
            return;
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
        this.toggle_check.checked = false;
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
     * Eclusão dos itens selecionados
     * 
     * 
     * @memberof VeiculosListagem
     */
    excluir() {
        if (this.toggle_check.checked) {
            $(':checkbox.checkitem').prop('defaultValue', (pos, val) => {
                this.select_exclusao.push(val)
            });
        }
        let para_exclusao = [];
        this.select_exclusao.forEach(val => {
            // this.db.delete(val)
            para_exclusao.push(val);
            // console.log(val);
        })
        console.log(para_exclusao);
        // this.db.batch(para_exclusao).then(result => {
        //     this.db.fetch().then(resolve => {
        //         this.veiculos = resolve.rows;
        //     });
        //     console.log(result);
        // }).catch(error => {
        //     console.log(error);
        // });
    }
}
