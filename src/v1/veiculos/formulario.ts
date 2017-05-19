import { autoinject, bindable } from 'aurelia-framework';
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
    @bindable veiculo: Veiculo;
    @bindable erros: Array<string>;
    private _placa;
    private _valor;
    private is_valid: boolean;
    private retorno: Object | any;
    private combustiveis: Array<string>;
    /**
     * CDI
     */
    constructor(
        private db: VeiculosModel,
        private subrouter: Router,
    ) { }
    /**
     * Quando o formulário é ativado
     * 
     * 
     * @memberof VeiculosFormulario
     */
    activate(veiculo?: any): void {
        this.inicializarAtributos();
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
    inicializarAtributos() {
        this.veiculo = new Veiculo();
        this.is_valid = true;
        this.combustiveis = [
            "Gasolina",
            "Alcool",
            "Flex"
        ];
        this.retorno = {
            mensagem: null,
            titulo: null,
            tipo: null
        };
    }
    /**
     * Persistir o item
     * 
     * 
     * @memberof VeiculosFormulario
     */
    persistir() {
        if (this.validar()) {
            let placa = this._placa.value.toUpperCase();
            this.veiculo._id = placa
            this.veiculo.placa = placa;
            this.veiculo.valor = this._valor.value;
            this.db.create(this.veiculo).then(result => {
                this.veiculo._id = result.id;
                this.mensagemSucesso("persistido");
            }).catch(error => {
                switch (error.status) {
                    case 409:
                        this.erroVeiculoJaCadastrado();
                        break;
                    default:
                        this.mensagemErro(error)
                        break;
                }
            });
        }
    }
    /**
     * Mesagem e tratamento para erros
     * 
     * 
     * @memberof VeiculosFormulario
     */
    erroVeiculoJaCadastrado() {
        this.retorno.mensagem = `Veículo placa ${this.veiculo.placa} já cadastrado`;
        this.retorno.tipo = "warning";
        this.retorno.titulo = "Alerta";

        this.veiculo._id = null;
        this.veiculo.placa = null;
        this._placa.value = null;
    }
    /**
     * Define a mensagem de sucesso
     * 
     * @param {string} acao 
     * 
     * @memberof VeiculosFormulario
     */
    mensagemSucesso(acao: string) {
        this.retorno.mensagem = `Item ${acao}`;
        this.retorno.titulo = "Sucesso";
        this.retorno.tipo = "success";
    }
    /**
     * Define a mensagem de sucesso
     * 
     * @param {string} acao 
     * 
     * @memberof VeiculosFormulario
     */
    mensagemErro(acao: string) {
        this.retorno.mensagem = `${acao}`;
        this.retorno.tipo = "danger";
        this.retorno.titulo = "Erro";
    }
    /**
     * Habilita o formulário para um novo cadastro
     * 
     * 
     * @memberof VeiculosFormulario
     */
    novo() {
        this.inicializarAtributos();
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
            this.mensagemSucesso('excluido');
            this.novo();
        }).catch(error => {
            this.mensagemErro(error.status === 404 ? "Veículo não localizado" : "Erro desconhecido")
        });
    }
    /**
     * Validação do formulário
     * 
     * @returns {boolean} 
     * 
     * @memberof VeiculosFormulario
     */
    validar(): boolean {
        this.erros = [];
        let mensagem = "é um campo obrigatório";
        if (!this.veiculo.placa) {
            this.erros.push(`Placa ${mensagem}`);
        }
        if (!this.veiculo.marca) {
            this.erros.push(`Marca ${mensagem}`);
        }
        if (!this.veiculo.modelo) {
            this.erros.push(`Modelo ${mensagem}`);
        }
        if (this.veiculo.imagem) {
            if (!this.validarUrlImagem()) {
                this.erros.push("O endereço da imagem não está no formato correto, deve ser uma URL válida");
            }
        }
        return this.is_valid = this.erros.length === 0;
    }
    /**
     * Verifica se o endereço da imagem está em um formato válido
     * 
     * @returns {boolean} 
     * 
     * @memberof VeiculosFormulario
     */
    validarUrlImagem(): boolean {
        return /^https?:\/\/.{3,}$/.test(this.veiculo.imagem);
    }
}
