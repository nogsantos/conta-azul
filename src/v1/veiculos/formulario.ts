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
    private _valor; // Passado por referência por conta da máscara aplicada no campo.
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
        this.limparMensagem();
    }
    /**
     * Persistir o item
     * 
     * 
     * @memberof VeiculosFormulario
     */
    persistir() {
        if (this.validar()) {
            this.limparMensagem();            
            this.veiculo._id = this.veiculo.placa = this.veiculo.placa.toUpperCase();
            this.veiculo.valor = this._valor.value;
            this.db.create(this.veiculo).then(response => {
                this.veiculo._id = response.id;
                this.veiculo._rev = response.rev;
                this.mensagemSucesso("persistido");
            }).catch(error => {
                switch (error.status) {
                    case 409:
                        this.erroVeiculoJaCadastrado();
                        break;
                    default:
                        this.mensagemErro(error.status)
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
        this.veiculo = new Veiculo();
    }
    /**
     * Define a mensagem de sucesso
     * 
     * @param {string} acao 
     * 
     * @memberof VeiculosFormulario
     */
    mensagemSucesso(acao: string) {
        this.retorno.mensagem = `Veículo ${acao}`;
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
        this.db.delete(placa).then(response => {
            this.mensagemSucesso(`${response.placa} excluído`);
            this.veiculo = new Veiculo();
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
        this.limparMensagem();
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
        return /^https?:\/\/(?:[a-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/g.test(this.veiculo.imagem);
    }
    /**
     * Limpa as mensagens de erro caso existam
     * 
     * 
     * @memberof VeiculosFormulario
     */
    limparMensagem() {
        if (this.erros && this.erros.length > 0) {
            this.erros.pop();
        }
        if (this.retorno && this.retorno.mensagem !== null) {
            this.retorno.mensagem = null
        }
    }
}
