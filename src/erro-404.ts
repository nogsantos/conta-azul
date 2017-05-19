import { autoinject } from 'aurelia-framework';
import { Router } from "aurelia-router";
/**
 * Erro 404
 * 
 * @export
 * @class Erro404
 */
@autoinject()
export class Erro404 {

    constructor(private router: Router){}

    retornar() {
        this.router.navigateBack();
    }
}
