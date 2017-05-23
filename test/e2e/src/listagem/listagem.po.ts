import { browser, element, by, By, $, $$, ExpectedConditions, protractor } from 'aurelia-protractor-plugin/protractor';
/**
 * Testa os elementos da listagem
 * 
 * @export
 * @class ListagemSpec
 */
export class ListagemSpec {
    private titulo_app: string;
    private titulo_listagem: string;

    constructor() {
        this.titulo_app = 'Teste Fabricio Nogueira';
        this.titulo_listagem = `Listagem | ${this.titulo_app}`;
    }

    acessar() {
        it('deve haver um título para a página e carregar os dados iniciais', () => {
            browser.getTitle().then(title => {
                expect(title).toBe(this.titulo_listagem);
                /*
                 * Acessa e verifica os dados 
                 */
                let dados = element.all(by.css('table tbody tr'));
                expect<any>(dados.count()).toBeGreaterThan(1);
            }).catch(error => {
                console.log(error);
            });
        });
    }

    buscar() {
        it('deve realizar uma busca por um termo', () => {
            element(by.valueBind('termo_para_busca')).sendKeys("gem").then(() => {
                element(by.valueBind('termo_para_busca')).sendKeys(protractor.Key.ENTER).then(() => {
                    let dados = element.all(by.css('table tbody tr'));
                    expect<any>(dados.count()).toBeGreaterThan(1);
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log(error);
            });
        });
    }
}
