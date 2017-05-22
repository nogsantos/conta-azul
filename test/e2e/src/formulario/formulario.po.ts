import { browser, element, by, By, $, $$, ExpectedConditions } from 'aurelia-protractor-plugin/protractor';

export class PageObjectFormulario {

    getCurrentPageTitle() {
        return browser.getTitle();
    }

    setPlaca(value) {
        let placa = element(by.id('_veiculo_placa'));
        return placa.clear().then(() => placa.sendKeys(value));
    }
    getPlaca() {
        return element(by.id('_veiculo_placa')).getAttribute('value');
    }

    setMarca(value) {
        let marca = element(by.id('_veiculo_marca'));
        return marca.clear().then(() => marca.sendKeys(value));
    }
    getMarca() {
        return element(by.id('_veiculo_marca')).getAttribute('value');
    }

    setModelo(value) {
        let modelo = element(by.id('_veiculo_modelo'));
        return modelo.clear().then(() => modelo.sendKeys(value));
    }
    getModelo() {
        return element(by.id('_veiculo_modelo')).getAttribute('value');
    }

    getErroValidacao() {
        return element(by.tagName('h5')).getText();
    }

    getMensagem() {
        return element(by.tagName('strong')).getText();
    }

    btnCadastrar() {
        element(by.id('btn_cadastrar')).click();
        return browser.waitForRouterComplete();
    }

    btnEditar() {
        element(by.id('btn_editar')).click();
        return browser.waitForRouterComplete();
    }

    btnExcluir() {
        element(by.id('btn_excluir')).click();
        return browser.waitForRouterComplete();
    }

    btnCancelar() {
        element(by.id('btn_cancelar')).click();
        return browser.waitForRouterComplete();
    }
}
