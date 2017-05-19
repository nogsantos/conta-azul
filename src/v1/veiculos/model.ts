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
            return this.db.put(veiculo, function callback(error, result) {
                if (error) {
                    return Promise.reject(error);
                } else {
                    return Promise.resolve(result);
                }
            });
        } catch (error) {
            console.log(error);
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
        return this.db.get(docId).then(doc => {
            doc._deleted = true;
            return this.db.put(doc);
        }).catch(error => {
            return Promise.reject(error);
        });
    }
    /**
     * Consulta todos os itens
     * 
     * @param {number} [skip] 
     * 
     * @memberof VeiculosModel
     */
    fetch(skip?: number): Promise<any> {
        return this.db.allDocs(
            {
                include_docs: true,
                descending: true,
                limit: 5,
                skip: skip ? skip : 0
            }, (error, doc) => {
                if (error) {
                    return Promise.reject(error);
                }
                return Promise.resolve(doc.rows);
            });
    }
    /**
     * Consulta um item por id
     * 
     * @param {string} [docId] 
     * 
     * @memberof VeiculosModel
     */
    get(docId: string): Promise<any> {
        return this.db.get(docId).then(item => {
            return Promise.resolve(item);
        }).catch(error => {
            return Promise.reject(error);
        });
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
        return this.db.bulkDocs(docs).then(result => {
            return Promise.resolve(result);
        }).catch(error => {
            return Promise.reject(error);
        });
    }

}
