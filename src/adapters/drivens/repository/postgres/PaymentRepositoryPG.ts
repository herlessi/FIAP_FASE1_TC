
import IPaymentRepository from "../../../../core/application/ports/out/IPaymentRepository";
import AUser from "../../../../core/domain/shared/Abstracts/AUser";
const config = require('../../../../../knexfile.js');

export default class PaymentRepositoryPG implements IPaymentRepository{
    
    
    private dbpg = require('knex')(config.desenvolvimento);

    savePayment(data:Object): Promise<Array<Object>> {

        return new Promise((resolve, reject) => {
            let code_status = 0;
            if(data.card_number == '1111111111111111'){
                code_status = 1
            }
            this.dbpg('order_payments').insert({
                order_id: data.order_id,    
                fl_status: code_status,
                payment_data: data}).returning('*')
            .then((resp) => {
                resolve(Array.from(resp));
            }).catch((error: any) => {
                console.error("Error inserting user:", error); 
                reject(false)
            });
        })

    }

    
 
}