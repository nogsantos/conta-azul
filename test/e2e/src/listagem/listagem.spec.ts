import { browser, element, by, By, $, $$, ExpectedConditions, protractor } from 'aurelia-protractor-plugin/protractor';
import { PageObjectListagem } from './listagem.po';

describe('Listagem:', function() {    
    const titulo_app: string = 'Teste Fabricio Nogueira';
    const titulo_listagem: string = `Listagem | ${titulo_app}`;
    const termo_para_busca: string = 'gem';
    const titulo_formulario_cadastro: string = `Cadastro de veículos | ${titulo_app}`;

    let poListagem: PageObjectListagem;

    beforeEach(() => {
        poListagem = new PageObjectListagem();
        browser.loadAndWaitForAureliaPage('http://localhost:9000');
    });

    it('deve acessar a listagem', () => {
        expect<any>(poListagem.getCurrentPageTitle()).toBe(titulo_listagem);        
    });

    it('deve carregar a listagem', () => {
        expect<any>(poListagem.carregarListagem()).not.toBe(undefined);        
    });

    it('deve acessar o formulário de cadastro de veículos', () => {
        poListagem.acessarFormulario();        
        browser.sleep(200);
        expect<any>(poListagem.getCurrentPageTitle()).toBe(titulo_formulario_cadastro);
    });        

    it('deve realizar uma busca por um termo', () => {        
        poListagem.setTermoParaBusca(termo_para_busca);      
        browser.sleep(200);  
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        expect<any>(poListagem.carregarListagem()).not.toBe(undefined);                
    });   

});
