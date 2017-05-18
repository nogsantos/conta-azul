import { autoinject, bindable } from 'aurelia-framework';
import { ValidationController, validationMessages, ValidationRules } from 'aurelia-validation';
import { Router } from "aurelia-router";
import { VeiculosModel } from "./model";
import { Veiculo } from "./veiculo";
/**
 * Formulário para cadastro / edição de um veículo
 * 
 * @export
 * @class VeiculosFormulario
 */
@autoinject()
export class VeiculosFormulario {
    private _placa;
    private _valor;
    private retorno: Object | any;
    private combustiveis: Array<string>;
    /**
     * CDI
     */
    constructor(
        @bindable private veiculo: Veiculo,
        private db: VeiculosModel,
        private subrouter: Router,
        private controller: ValidationController
    ) {
        ValidationRules
            .ensure((veiculo: Veiculo) => veiculo.placa)
            .displayName("Placa")
            .required()
            .ensure((veiculo: Veiculo) => veiculo.marca)
            .displayName("Marca")
            .required()
            .ensure((veiculo: Veiculo) => veiculo.modelo)
            .displayName("Modelo")
            .required()
            .ensure((veiculo: Veiculo) => veiculo.imagem)
            .displayName("Imagem")
            .matches(/^https?:\/\/.{3,}$/)
            .matches(/^\S*$/)
            .on(Veiculo);
        validationMessages['required'] = `\${$displayName} é um campo obrigatório`;
        validationMessages['matches'] = `O campo \${$displayName} não está no formato correto, deve ser uma URL válida`;
    }
    /**
     * Quando o formulário é ativado
     * 
     * 
     * @memberof VeiculosFormulario
     */
    activate(veiculo?: any): void {
        this.paramsInitialize()
        if (veiculo.id) {
            this.db.get(`${veiculo.id}`).then(result => {
                this.veiculo = Object.assign({}, result);
            });
        }
    }
    /**
     * Inicialização dos parâmetro de classe
     * 
     * 
     * @memberof VeiculosFormulario
     */
    paramsInitialize() {
        this.veiculo = new Veiculo();
        this.retorno = {
            mensagem: null,
            titulo: null,
            tipo: null
        };
        this.combustiveis = [
            "Gasolina",
            "Alcool",
            "Flex"
        ];
    }
    /**
     * Persistir o item
     * 
     * 
     * @memberof VeiculosFormulario
     */
    persistir() {
        let placa = this._placa.value.toUpperCase();
        this.veiculo._id = placa
        this.veiculo.placa = placa;
        this.controller.validate().then(validate => {
            if (validate.valid) {
                this.veiculo.valor = this._valor.value;
                this.db.create(this.veiculo).then(result => {
                    this.veiculo._id = result.id;
                    this.retorno.mensagem = "Item persistido";
                    this.retorno.titulo = "Sucesso";
                    this.retorno.tipo = "success";
                }).catch(error => {
                    switch (error.status) {
                        case 409:
                            this.retorno.mensagem = `Veículo placa ${this.veiculo.placa} já cadastrado`;
                            this.retorno.tipo = "warning";
                            this.retorno.titulo = "Alerta";
                            this.veiculo._id = null;
                            break;
                        default:
                            this.retorno.mensagem = error;
                            this.retorno.tipo = "danger";
                            this.retorno.titulo = "Erro";
                            break;
                    }
                });
            }
        });
    }
    /**
     * Habilita o formulário para um novo cadastro
     * 
     * 
     * @memberof VeiculosFormulario
     */
    novo() {
        this.paramsInitialize();
    }
    /**
     * Cancela retornando a listagem
     * 
     * 
     * @memberof VeiculosFormulario
     */
    cancelar() {
        this.subrouter.navigateBack();
    }
    /**
     * Deleta um item
     * 
     * 
     * @memberof VeiculosFormulario
     */
    excluir(placa) {
        this.db.delete(placa).then(success => {
            this.retorno.mensagem = "Item excluído";
            this.retorno.titulo = "Sucesso";
            this.retorno.tipo = "success";
            this.novo();
        }).catch(error => {
            this.retorno.mensagem = error.status === 404 ? "Veículo não localizado" : "Erro desconhecido";
            this.retorno.tipo = "danger";
            this.retorno.titulo = "Erro";
        });
    }
}
