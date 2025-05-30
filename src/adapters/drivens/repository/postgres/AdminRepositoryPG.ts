import IAdminRepositoryPg from "../../../../core/application/ports/out/IAdminRepositoryPg";
const config = require('../../../../../knexfile.js');

export default class AdminRepositoryPG implements IAdminRepositoryPg{
    
    
    private dbpg = require('knex')(config.desenvolvimento);

    public async checkLogin(user: Object): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
           
            console.log('user ',user)
            this.dbpg('users').select('*').where(user)
            .then((rows: any) => {
                resolve(Array.from(rows));
            }).catch((error: any) => {
                console.error("Error inserting user:", error); 
                reject(false)
            });

        })
    }
 
}