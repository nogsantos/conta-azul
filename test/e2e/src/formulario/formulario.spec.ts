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
        expect<any>(poFormulario.getCurrentPageTitle()).toBe(titulo_formulario_cadastro);
    });

    it('deve cadastrar um veículo informando os campos obrigatórios', () => {
        poFormulario.setPlaca('NVC-7029');
        poFormulario.setMarca('Chevrolet');
        poFormulario.setModelo('Celta 1.0');
        browser.sleep(200);
        poFormulario.btnCadastrar();

        expect<any>(poFormulario.getMensagem()).toBe('Sucesso');        
    });

    it('deve não permitir o cadastro de veículos em duplicidade', () => {
        poFormulario.setPlaca('NVC-7029');
        poFormulario.setMarca('Chevrolet');
        poFormulario.setModelo('Celta 1.0 preto');
        browser.sleep(200);
        poFormulario.btnCadastrar();

        expect<any>(poFormulario.getMensagem()).toBe('Alerta');
    });

    it('não deve cadastrar um veículo quando não informado os campos obrigatórios', () => {
        poFormulario.setPlaca('');
        poFormulario.setMarca('');
        poFormulario.setModelo('');
        browser.sleep(200);
        poFormulario.btnCadastrar();

        expect<any>(poFormulario.getErroValidacao()).toBe('Atenção');
    });
});
