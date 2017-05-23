import { PageObjectFormulario } from './formulario.po';
import { browser, element, by, By, $, $$, ExpectedConditions, protractor } from 'aurelia-protractor-plugin/protractor';

describe('Formulário:', function () {
    const titulo_app: string = 'Teste Fabricio Nogueira';
    const titulo_listagem: string = `Listagem | ${titulo_app}`;
    const titulo_formulario_cadastro: string = `Cadastro de veículos | ${titulo_app}`;
    const titulo_formulario_edicao: string = `Edição de veículos | ${titulo_app}`;

    let poFormulario: PageObjectFormulario;

    beforeEach(() => {
        poFormulario = new PageObjectFormulario();
        browser.loadAndWaitForAureliaPage('http://localhost:9000/#/veiculo/cadastrar');
    });

    it('deve acessar o formulário para cadastro', () => {
        browser.sleep(300);
        expect<any>(poFormulario.getCurrentPageTitle()).toBe(titulo_formulario_cadastro);
    });

    it('deve cadastrar um veículo informando os campos obrigatórios', () => {
        poFormulario.setPlaca('NVC-7029');
        poFormulario.setMarca('Chevrolet');
        poFormulario.setModelo('Celta 1.0');        
        poFormulario.btnCadastrar();
        browser.sleep(300);
        expect<any>(poFormulario.getMensagem()).toContain('Sucesso');        
    });

    it('deve não permitir o cadastro de veículos em duplicidade', () => {
        poFormulario.setPlaca('NVC-7029');
        poFormulario.setMarca('Chevrolet');
        poFormulario.setModelo('Celta 1.0 preto');        
        poFormulario.btnCadastrar();
        browser.sleep(300);
        expect<any>(poFormulario.getMensagem()).toContain('Alerta');
    });

    it('não deve cadastrar um veículo quando não informado os campos obrigatórios', () => {
        poFormulario.setPlaca('');
        poFormulario.setMarca('');
        poFormulario.setModelo('');        
        poFormulario.btnCadastrar();
        browser.sleep(300);
        expect<any>(poFormulario.getErroValidacao()).toContain('Atenção');
    });
});
