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
    private retorno = {
        mensagem: null,
        titulo: null,
        tipo: null
    };
    private combustiveis = [
        "Gasolina",
        "Alcool",
        "Flex"
    ];
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
            .ensure((veiculo: Veiculo) => veiculo.placa).displayName("Placa").required()
            .ensure((veiculo: Veiculo) => veiculo.marca).displayName("Marca").required()
            .ensure((veiculo: Veiculo) => veiculo.modelo).displayName("Modelo").required()
            .on(Veiculo);
        validationMessages['required'] = `\${$displayName} é um campo obrigatório`;
    }
    /**
     * Cadastra o item
     * 
     * 
     * @memberof VeiculosFormulario
     */
    cadastrar() {        
        this.veiculo._id = this._placa.value.toUpperCase();
        this.veiculo.placa = this._placa.value.toUpperCase();
        this.controller.validate().then(validate => {
            console.log(validate);
            if (validate.valid) {
                this.veiculo.valor = this._valor.value;
                this.db.create(this.veiculo).then(result => {
                    this.retorno.mensagem = "Item cadastrado";
                    this.retorno.titulo = "Sucesso:";
                    this.retorno.tipo = "success";
                }).catch(error => { 
                    this.retorno.mensagem = error;
                    this.retorno.titulo = "Erro:";
                    this.retorno.tipo = "danger";
                });
            }
        });
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
}
