import { Veiculo } from "./veiculo";
import * as Pouchdb from "pouchdb";
/**
 * Model veículos
 * 
 * @export
 * @class VeiculosModel
 */
export class VeiculosModel {
    private db: Pouchdb
    private veiculo: Veiculo;
    /**
     * Creates an instance of VeiculosModel.
     * 
     * @memberof VeiculosModel
     */
    constructor() {
        this.db = new Pouchdb('conta-azul-veiculos');
    }
    /**
     * Cadastra um item
     * 
     * @param {Veiculo} veiculo 
     * 
     * @memberof VeiculosModel
     */
    create(veiculo: Veiculo | any): Promise<any> {
        return this.db.put(veiculo, function callback(err, result) {
            if (err) {
                return Promise.reject(err);
            } else {
                return Promise.resolve(result);
            }
        });
    }
    /**
     * Atualiza um item
     * 
     * 
     * @memberof VeiculosModel
     */
    update(id: Veiculo) {

    }
    /**
     * Exclui um item
     * 
     * @param {number} id 
     * 
     * @memberof VeiculosModel
     */
    delete(id: number) {

    }
    /**
     * Consulta um ou todos os itens
     * 
     * @param {number} [id] 
     * 
     * @memberof VeiculosModel
     */
    fetch(id?: number): Promise<any> {
        return Promise.resolve(
            this.db.allDocs({ include_docs: true, descending: true }, (err, doc) => {
                return doc.rows;
            })
        );
    }

}
