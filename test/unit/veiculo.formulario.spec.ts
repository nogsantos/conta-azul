import { Container } from 'aurelia-dependency-injection';
import { BindingLanguage } from 'aurelia-templating';
import { TemplatingBindingLanguage } from 'aurelia-templating-binding';
import { VeiculosFormulario } from '../../src/v1/veiculos/formulario';
import { Veiculo } from "../../src/v1/veiculos/veiculo";
import { VeiculosModel } from "../../src/v1/veiculos/model";
import { Router } from "aurelia-router";

describe('Formulário veículo:', function () {
    let container: Container;
    let formulario: VeiculosFormulario | any;
    let veiculo: Veiculo;
    let db: VeiculosModel;
    let subrouter: Router

    beforeEach(() => {
        container = new Container().makeGlobal();
        container.registerInstance(BindingLanguage, container.get(TemplatingBindingLanguage));
        subrouter = container.get(Router);

        veiculo = new Veiculo();
        db = new VeiculosModel();
        formulario = new VeiculosFormulario(db, subrouter);

        formulario.erros = [];
        formulario.veiculo = veiculo;
    });

    it("os campos obrigatorios são validados", () => {
        veiculo.marca = "Chevrolet";
        veiculo.modelo = "Celta";
        veiculo.placa = "ABC-1234";
        expect(formulario.validar()).toBe(true);

        veiculo.marca = null;
        veiculo.modelo = null;
        veiculo.placa = null;
        expect(formulario.validar()).toBe(false);
    });

    it("o endeço da imagem possui uma url e tipo em um formato válido", () => {
        veiculo.imagem = "https://www.google.com.br/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";
        expect(formulario.validarUrlImagem()).toBe(true);
        veiculo.imagem = "alguma url";
        expect(formulario.validarUrlImagem()).toBe(false);
    });

});
