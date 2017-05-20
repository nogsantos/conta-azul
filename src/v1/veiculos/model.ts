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
        try {
            let promise = this.db.put(veiculo, (error, result) => {
                if (error) {
                    Promise.reject(error);
                    return;
                }
                Promise.resolve(result);
            });
            return promise;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /**
     * Exclui um item
     * 
     * @param {string} id 
     * 
     * @memberof VeiculosModel
     */
    delete(docId: string): Promise<any> {
        try {
            return this.db.get(docId, (error, result) => {
                if (error) {
                    Promise.reject(error);
                }
                this.db.remove(result._id, result._rev, (error, result) => {
                    if (error) {
                        Promise.reject(error);
                    }
                    Promise.resolve(result);
                });
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /**
     * Consulta todos os itens
     * 
     * @param {number} [skip] 
     * 
     * @memberof VeiculosModel
     */
    fetch(skip?: number): Promise<any> {
        try {
            return this.db.allDocs({
                include_docs: true,
                descending: true,
                limit: 5,
                skip: skip ? skip : 0
            }, (error, result) => {
                if (error) {
                    Promise.reject(error);
                }
                Promise.resolve(result.rows);
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /**
     * Consulta um item por id
     * 
     * @param {string} [docId] 
     * 
     * @memberof VeiculosModel
     */
    get(docId: string): Promise<any> {
        try {
            return this.db.get(docId, (error, result) => {
                if (error) {
                    Promise.reject(error);
                }
                Promise.resolve(result);
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /**
     * Criar, atualizar, excluir multiplos documentos
     * 
     * Deletar o atributo "_deleted : true" deve estar presente no objeto.
     * Atualizar o atributo "_id : id" deve estar presente no objeto.
     * 
     * @param {Array<any>} docs 
     * @returns {Promise<any>} 
     * 
     * @memberof VeiculosModel
     */
    batch(docs: Array<any>): Promise<any> {
        try {
            return this.db.bulkDocs(docs, (error, result) => {
                if (error) {
                    Promise.reject(error);
                }
                Promise.resolve(result);
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
