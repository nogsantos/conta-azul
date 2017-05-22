import { Container } from 'aurelia-dependency-injection';
import { BindingLanguage } from 'aurelia-templating';
import { TemplatingBindingLanguage } from 'aurelia-templating-binding';
import { VeiculosListagem } from '../../src/v1/veiculos/listagem';
import { Veiculo } from "../../src/v1/veiculos/veiculo";
import { VeiculosModel } from "../../src/v1/veiculos/model";
import { Router } from "aurelia-router";

describe('Listagem de veículos', function () {
    let container: Container;
    let listagem: VeiculosListagem;
    let veiculo: Veiculo;
    let db: VeiculosModel;
    let subrouter: Router

    beforeEach(() => {
        container = new Container().makeGlobal();
        container.registerInstance(BindingLanguage, container.get(TemplatingBindingLanguage));
        subrouter = container.get(Router);

        veiculo = new Veiculo();
        db = new VeiculosModel();
        listagem = new VeiculosListagem(subrouter, db);
    });

    it("instancia a listagem", () => {    
        expect(listagem).not.toBe(undefined);
    });
});
