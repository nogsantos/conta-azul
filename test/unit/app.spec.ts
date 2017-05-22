import { App } from '../../src/app';

class RouterStub {
    routes;

    configure(handler) {
        handler(this);
    }

    map(routes) {
        this.routes = routes;
    }
}
describe('App', () => {
    let sut: any;
    let mockedRouter: any;

    beforeEach(() => {
        mockedRouter = new RouterStub();
        sut = new App();
        sut.configureRouter(mockedRouter, mockedRouter);
    });

    it('contém as propriedades das configurações das rotas', () => {
        expect(sut.router).toBeDefined();
    });

    it('deve configurar um titulo para as rotas', () => {
        expect(sut.router.title).toEqual('Teste Fabricio Nogueira');
    });

    it('deve ter uma rota para listagem de veículos', () => {
        expect(sut.router.routes).toContain({
            route: ['index', 'home', 'veiculo', ''],
            name: 'VeiculosListagem',
            moduleId: 'v1/veiculos/listagem',
            title: 'Listagem',
            nav: false,
            auth: false
        });
    });

    it('deve ter uma rota para o cadastro de veículos', () => {
        expect(sut.router.routes).toContain({
            route: 'veiculo/cadastrar',
            name: 'VeiculosCadastrar',
            moduleId: 'v1/veiculos/formulario',
            title: 'Cadastro de veículos',
            nav: false,
            auth: false
        });
    });

    it('deve ter uma rota para a edição de um veículos', () => {
        expect(sut.router.routes).toContain({
            route: 'veiculo/editar/:id?',
            name: 'VeiculosEditar',
            moduleId: 'v1/veiculos/formulario',
            title: 'Edição de veículos',
            nav: false,
            auth: false
        });
    });
});
