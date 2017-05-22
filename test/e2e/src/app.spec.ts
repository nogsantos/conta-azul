import { PageObjectListagem } from './listagem.po';
import { browser, element, by, By, $, $$, ExpectedConditions } from 'aurelia-protractor-plugin/protractor';

describe('App', () => {
    let poListagem: PageObjectListagem;

    beforeEach(() => {
        poListagem = new PageObjectListagem();
        // browser.loadAndWaitForAureliaPage('http://localhost:9000');
    });

    it('should load page', async () => {
        browser.get('http://localhost:9000').then(result =>{
            console.log(result);
            expect(browser.getTitle()).toEqual("localhost");
        }).catch(error =>{
            console.log(error);
        });    
    });


});
