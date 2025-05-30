import OrderRepositoryPG from "../../../../adapters/drivens/repository/postgres/OrderRepositoryPG";
import IService from "../../ports/in/InServices";
import IPaymentRepository from "../../ports/out/IPaymentRepository";
import SetStatusOrderService from "./setStatusOrderService";

export default class PaymentSaveService implements IService<Object,Promise<Array<Object>>>{

    repo: IPaymentRepository;

    constructor(repo:IPaymentRepository){
        this.repo = repo
    }
       
    async execute(data:Object): Promise<Array<Object>> {

        return new Promise((resolve, reject) => {

            // return await this.repo.savePayment(data)
            this.repo.savePayment(data).then(resp =>{
                console.log('resp', resp)
                console.log('----')
                if(resp?.length > 0 && resp[0].fl_status == 1){

                    const setStatusOrderService = new SetStatusOrderService(new OrderRepositoryPG())
                    setStatusOrderService.execute({order_id:data.order_id,fl_status:2}).then(resp =>{
                        resolve(resp)
                    }).catch(error =>{
                        reject(error)
                    })
                    
                }else{
                    reject({
                        code:400,
                        message:'Não foi possivel concluir o pagamento'
                    })
                }
            }).catch(err =>{
                reject(err)
            })

        })
        
    }


    

}