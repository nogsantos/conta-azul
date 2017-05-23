import { Aurelia } from 'aurelia-framework';
import { NavigationInstruction, RouterConfiguration, Router, RouteConfig } from "aurelia-router";
/**
 * Define e configura as rotas do app
 * 
 * 
 * @export
 * @class App
 */
export class App {
    router: Router;
    /**
     * Configuração das rotas
     * 
     * @param {RouterConfiguration} config 
     * @param {AppRouter} router 
     * 
     * @memberof App
     */
    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "Teste Fabricio Nogueira";
        /*
         * Tratamento para rotas desconhecidas         
         */
        try {
            let handleUnknownRoutes = (instruction: NavigationInstruction): RouteConfig => {
                return { route: '404', moduleId: 'erro-404' };
            }
            config.mapUnknownRoutes(handleUnknownRoutes);
        } catch (error) { }
        /*
         * Mapeamento das rotas 
         */
        config.map([
            {
                route: ['index', 'home', 'veiculo', ''],
                name: 'VeiculosListagem',
                moduleId: 'v1/veiculos/listagem',
                title: 'Listagem',
                nav: false,
                auth: false
            },
            {
                route: 'veiculo/cadastrar',
                name: 'VeiculosCadastrar',
                moduleId: 'v1/veiculos/formulario',
                title: 'Cadastro de veículos',
                nav: false,
                auth: false
            },
            {
                route: 'veiculo/editar/:id?',
                name: 'VeiculosEditar',
                moduleId: 'v1/veiculos/formulario',
                title: 'Edição de veículos',
                nav: false,
                auth: false
            }
        ]);
        this.router = router;
    }
}
