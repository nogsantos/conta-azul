import { autoinject, bindable, bindingMode, LogManager } from 'aurelia-framework';
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
    private log = LogManager.getLogger('LISTAGEM');
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
    text = '<b>Dica</b><br>Para editar, basta apenas um clique duplo na linha do item desejado.'
    /*     
     * Check
     */
    @bindable toggle_check;
    @bindable private master_is_checked: boolean;
    @bindable select_exclusao: string[] = [];
    /*     
     * Busca
     */
    @bindable termo_para_busca: string;
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
        this.listarTodos();
    }
    /**
     * Listar todos os itens
     * 
     * 
     * @memberof VeiculosListagem
     */
    listarTodos() {
        this.db.fetch().then(response => {
            this.total_items = response.total_rows;
            if (response.rows.length > 0) {
                this.veiculos = response.rows;
            } else {
                this.trigger = 'mouseover';
                this.seed();
            }
        }).catch(error => {
            this.log.error(`[listarTodos] ${error}`);
        });
    }
    /**
     * Limpa o array de itens para exclusão
     * 
     * 
     * @memberof VeiculosListagem
     */
    popItens() {
        while (this.select_exclusao.length) {
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
     * @param {any} veiculo
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
            alert("Desculpe, alguns erros inesperados ocorreram")
            this.log.error(`[seed] ${error}`);
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
        /*
         * Prepeara os itens selecionados para a exclisão 
         */
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
        });
        /*
         * Exclui em massa 
         */
        this.db.batch(para_exclusao).then(result => {
            this.db.fetch().then(response => {
                /*
                 * Prepara a listagem 
                 */
                this.master_is_checked = false;
                this.popItens();
                /*
                 * Lista os itens novamente
                 */
                this.total_items = response.total_rows;
                this.veiculos = response.rows;
            });
        }).catch(error => {
            this.log.error(`[batch] ${error}`);
        });
    }
    /**
     * Buscador. A busca pode ser realizado por Modelo ou Combustível
     * 
     * 
     * @memberof VeiculosListagem
     */
    buscar() {
        if (this.termo_para_busca) {
            this.db.fetch(null, this.termo_para_busca).then(response => {
                this.veiculos = response.docs;
                this.total_items = 0;
            });
            return;
        }
        this.listarTodos();
    }
    /**
     * Clique no check master
     * 
     * @param newVal 
     * @param oldVal 
     */
    master_is_checkedChanged(newVal, oldVal) {
        if (!newVal) {
            $(':checkbox.checkitem').prop('checked', false);
            this.popItens();
            return;
        }
        $(':checkbox.checkitem').prop('checked', true);
    }
}
