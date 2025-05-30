import IRepository from "../../../../core/application/ports/out/IRepository";
import AUser from "../../../../core/domain/shared/Abstracts/AUser";
import Helper from "../../../../core/domain/shared/Helper";
const config = require('../../../../../knexfile.js');

export default class ProductRepositoryPG implements IRepository{
    
    
    private dbpg = require('knex')(config.desenvolvimento);

    save(user:AUser): Promise<Array<Object>> {

        let obj = Helper.cleanObject(user)

        return new Promise((resolve, reject) => {
            this.dbpg('product').insert(obj).returning('*')
            .then((resp) => {
                resolve(Array.from(resp));
            }).catch((error: any) => {
                console.error("Error inserting user:", error); 
                reject(false)
            });
        })

    }

    update(user:AUser): Promise<Array<Object>> {

        let obj = Helper.cleanObject(user)

        return new Promise((resolve, reject) => {
            this.dbpg('product').update(obj).where({id:obj.id}).returning('*')
            .then((resp) => {
                resolve(Array.from(resp));
            }).catch((error: any) => {
                console.error("Error inserting user:", error); 
                reject(false)
            });
        })

    }

    delete(user:AUser): Promise<Array<Object>> {

        let obj = Helper.cleanObject(user)

        return new Promise((resolve, reject) => {
            this.dbpg('product').update({fl_status:false}).where({id:obj.id}).returning('*')
            .then((resp) => {
                resolve(Array.from(resp));
            }).catch((error: any) => {
                console.error("Error inserting user:", error); 
                reject(false)
            });
        })

    }

    list(prod: Object): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {

            if(prod.id || prod.category_id || prod.name || prod.price){

                let obj = Helper.cleanObject(prod)
            
                this.dbpg('product').select('*').where(obj)
                .then((rows: any) => {
                    resolve(Array.from(rows));
                }).catch((error: any) => {
                    console.error("Error inserting user:", error); 
                    reject(false)
                });

            }else{
                this.dbpg('product').select('*')
                .then((rows: any) => {
                    resolve(Array.from(rows));
                }).catch((error: any) => {
                    console.error("Error inserting user:", error); 
                    reject(false) 
                });
            }

        })
    }
 
}