import IRepository from "../../../../core/application/ports/out/IRepository";
import AUser from "../../../../core/domain/shared/Abstracts/AUser";
const config = require('../../../../../knexfile.js');

export default class CustomerRepositoryPG implements IRepository{
    
    
    private dbpg = require('knex')(config.desenvolvimento);

    save(user:AUser): Promise<Array<Object>> {

        return new Promise((resolve, reject) => {
            this.dbpg('customer').insert({
                name: user.name,    
                email: user.email,
                cpf: user.cpf}).returning('*')
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
            
                this.dbpg('customer').select('*').where(user)
                .then((rows: any) => {
                    resolve(Array.from(rows));
                }).catch((error: any) => {
                    console.error("Error inserting user:", error); 
                    reject(false)
                });

            }else{
                this.dbpg('customer').select('*')
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