import { browser } from 'aurelia-protractor-plugin/protractor';
import { ListagemSpec } from './listagem/listagem.po'
import { FormularioSpec } from './formulario/formulario.po'
describe('App', () => {
    let testeListagem: ListagemSpec;
    let testeFormulario: FormularioSpec;

    beforeEach(() => {
        browser.loadAndWaitForAureliaPage('/');
    });

    testeListagem = new ListagemSpec();
    testeListagem.acessar();
    testeListagem.buscar();

    testeFormulario = new FormularioSpec();
    testeFormulario.acessar();
    testeFormulario.cadastrar();
    testeFormulario.testarDuplicidade();
    testeFormulario.testarCamposObrigatorios();
    
});
