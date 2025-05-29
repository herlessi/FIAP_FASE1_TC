import OrderManager from "../../../domain/orderManager/OrderManager";
import IService from "../../ports/in/InServices";
import IOrderRepository from "../../ports/out/IOrderRepository";

export default class RemoveProductToOrderService implements IService<Object,Promise<Array<Object>>>{

    repo: IOrderRepository;

    constructor(repo:IOrderRepository){
        this.repo = repo
    }
       
    async execute(data:Object): Promise<Array<Object>> {

        return new Promise((resolve, reject) => {

            const orderManager = new OrderManager(this.repo)
            orderManager.removeProductFromOrder(data).then((order) => {
                resolve(order);
            }).catch((error) => {
                console.error("Error removeProductFromOrder:", error); 
                reject(error);
            })
            

        })
        
    }


    

}