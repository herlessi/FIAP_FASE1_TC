import OrderManager from "../../../domain/orderManager/OrderManager";
import IService from "../../ports/in/InServices";
import IOrderRepository from "../../ports/out/IOrderRepository";

export default class AddProductToOrderService implements IService<Object,Promise<Array<Object>>>{

    repo: IOrderRepository;

    constructor(repo:IOrderRepository){
        this.repo = repo
    }
       
    async execute(data:Object): Promise<Array<Object>> {

        return new Promise((resolve, reject) => {

            let retorno = null;
            
                const orderManager = new OrderManager(this.repo)
                orderManager.addProductToOrder(data).then((result) => {
                    console.log("Product added to order:", result); 
                    resolve(result);
                }).catch((error) => {
                    console.error("Error adding product to order:", error); 
                    reject(error);
                })
        })
        
        
    }


    

}