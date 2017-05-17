import { NavigationInstruction, RouterConfiguration, AppRouter } from "aurelia-router";
/**
 * 
 * 
 * @export
 * @class App
 */
export class App {
    private router: AppRouter;
    /**
       * Configuração das rotas
       * 
       * @param {RouterConfiguration} config 
       * @param {AppRouter} router 
       * 
       * @memberof App
       */
    configureRouter(config: RouterConfiguration, router: AppRouter): void {
        config.title = "Teste Fabricio Nogueira";

        config.map({
            route: ['index', 'home', 'veiculo', ''],
            name: 'VeiculosListagem',
            moduleId: 'v1/veiculos/listagem',
            nav: false,
            auth: false
        }).map({
            route: 'veiculo/cadastrar',
            name: 'VeiculosCadastrar',
            moduleId: 'v1/veiculos/formulario',
            nav: false,
            auth: false
        }).map({
            route: 'veiculo/editar/:id',
            name: 'VeiculosEditar',
            moduleId: 'v1/veiculos/formulario',
            nav: false,
            auth: false        
        });
        /*
         * Tratando as rotas desconhecidas
         */
        let navStrat = (instruction: NavigationInstruction) => {
            if (instruction.config === null) {
                return '404';
            }
            instruction.config.moduleId = instruction.fragment;
            instruction.config.href = instruction.fragment;
        };
        config.mapUnknownRoutes(navStrat);
        this.router = router;
    }
}
