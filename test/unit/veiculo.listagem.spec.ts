import { Container } from 'aurelia-dependency-injection';
import { BindingLanguage } from 'aurelia-templating';
import { TemplatingBindingLanguage } from 'aurelia-templating-binding';
import { VeiculosListagem } from '../../src/v1/veiculos/listagem';

describe('Listagem de veículos', () => {
    let container: Container;
    let listagem: VeiculosListagem;

    beforeEach(() => {
        container = new Container().makeGlobal();
        container.registerInstance(BindingLanguage, container.get(TemplatingBindingLanguage));
        listagem = container.get(VeiculosListagem);
    });

    it("instancia a listagem", () => {        
        expect(1).toBe(1);                
    });
});
