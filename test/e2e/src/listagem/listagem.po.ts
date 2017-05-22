import { browser, element, by, By, $, $$, ExpectedConditions } from 'aurelia-protractor-plugin/protractor';

export class PageObjectListagem {
    
    getCurrentPageTitle() {
        return browser.getTitle();
    }

    acessarFormulario() {
        element(by.id('btn_novo_carro')).click();
        return browser.waitForRouterComplete();
    }

    carregarListagem() {        
        return element(by.model('veiculos'));        
    }

    getTermoParaBusca(){
        return element(by.valueBind('termo_para_busca'));
    }

    setTermoParaBusca(value){
        const busca = this.getTermoParaBusca();        
        return busca.sendKeys(value);
    }
}
