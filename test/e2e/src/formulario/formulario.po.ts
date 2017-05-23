import { browser, element, by, By, $, $$, ExpectedConditions, protractor } from 'aurelia-protractor-plugin/protractor';
/**
 * Testa os elementos do formulário
 * 
 * @export
 * @class FormularioSpec
 */
export class FormularioSpec {
    private titulo_app: string;
    private titulo_formulario_cadastro: string;
    private titulo_formulario_edicao: string;
    private placa: string;
    private marca: string;
    private modelo: string;

    constructor() {
        this.titulo_app = 'Teste Fabricio Nogueira';
        this.titulo_formulario_cadastro = `Cadastro de veículos | ${this.titulo_app}`;
        this.titulo_formulario_edicao = `Edição de veículos | ${this.titulo_app}`;
        this.placa = "NVC-7029";
        this.marca = "Chevrolet";
        this.modelo = "Celta 1.0";
    }

    acessar() {
        it('deve acessar o formulário de cadastro de veículos', () => {
            element(by.partialButtonText('Novo')).click().then(() => {
                browser.waitForRouterComplete();
                browser.getTitle().then(current_title => {
                    expect(current_title).toBe(this.titulo_formulario_cadastro);
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log(error);
            });
        });
    }

    cadastrar() {
        it('deve cadastrar um veículo informando os campos obrigatórios', () => {
            element(by.partialButtonText('Novo')).click().then(() => {
                browser.waitForRouterComplete();
                element(by.id('_veiculo_placa')).sendKeys(this.placa);
                element(by.id('_veiculo_marca')).sendKeys(this.marca);
                element(by.id('_veiculo_modelo')).sendKeys(this.modelo);
                element(by.buttonText('Cadastrar')).click().then(ret => {
                    expect(element(by.css('div strong')).getText()).toContain('Sucesso');
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log(error);
            });
        });
    }

    testarDuplicidade() {
        it('deve não permitir o cadastro de veículos em duplicidade', () => {
            element(by.partialButtonText('Novo')).click().then(() => {
                browser.waitForRouterComplete();
                element(by.id('_veiculo_placa')).sendKeys(this.placa);
                element(by.id('_veiculo_marca')).sendKeys(this.marca);
                element(by.id('_veiculo_modelo')).sendKeys(this.modelo);
                element(by.buttonText('Cadastrar')).click().then(ret => {
                    expect(element(by.css('div strong')).getText()).toContain('Alerta');
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log(error);
            });
        });
    }

    testarCamposObrigatorios() {
        it('deve não permitir cadastrar um veículo quando um ou mais campos obrigatórios estiverem vazios', () => {
            element(by.partialButtonText('Novo')).click().then(() => {
                browser.waitForRouterComplete();
                element(by.id('_veiculo_placa')).sendKeys(this.placa);
                element(by.id('_veiculo_marca')).clear();
                element(by.id('_veiculo_modelo')).clear();
                element(by.buttonText('Cadastrar')).click().then(ret => {
                    let erros = element(by.repeater('error of erros'));
                    expect(erros).not.toBe(null);
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log(error);
            });
        });
    }

}
