import OrderManager from "../../../domain/orderManager/OrderManager";
import IService from "../../ports/in/InServices";
import IOrderRepository from "../../ports/out/IOrderRepository";

export default class SetStatusOrderService implements IService<Object,Promise<Array<Object>>>{

    repo: IOrderRepository;

    constructor(repo:IOrderRepository){
        this.repo = repo
    }
       
    async execute(data:Object): Promise<Array<Object>> {

        return new Promise((resolve, reject) => {

            this.repo.setOrderStatus({order_id:data.order_id,fl_status:data.fl_status}).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
            

        })
        
    }


    

}