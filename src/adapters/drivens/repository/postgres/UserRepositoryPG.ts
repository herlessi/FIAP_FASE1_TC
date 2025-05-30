import IRepository from "../../../../core/application/ports/out/IRepository";
import AUser from "../../../../core/domain/shared/Abstracts/AUser";
import Helper from "../../../../core/domain/shared/Helper";
const config = require('../../../../../knexfile.js');

export default class UserRepositoryPG implements IRepository{
    
    
    private dbpg = require('knex')(config.desenvolvimento);

    save(user:AUser): Promise<Array<Object>> {

        let obj = Helper.cleanObject(user)

        return new Promise((resolve, reject) => {
            this.dbpg('users').insert(obj).returning('*')
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
            this.dbpg('users').update(obj).where({id:obj.id}).returning('*')
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
            this.dbpg('users').update({fl_status:false}).where({id:obj.id}).returning('*')
            .then((resp) => {
                resolve(Array.from(resp));
            }).catch((error: any) => {
                console.error("Error inserting user:", error); 
                reject(false)
            });
        })

    }

    list(user: Object): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {

            if(user.id || user.cpf || user.name || user.email){

                let obj = Helper.cleanObject(user)
            
                this.dbpg('users').select('*').where(obj)
                .then((rows: any) => {
                    resolve(Array.from(rows));
                }).catch((error: any) => {
                    console.error("Error inserting user:", error); 
                    reject(false)
                });

            }else{
                this.dbpg('users').select('*')
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