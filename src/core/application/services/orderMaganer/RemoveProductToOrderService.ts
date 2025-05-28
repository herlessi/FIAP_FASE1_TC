import IService from "../../ports/in/InServices";
import IOrderRepository from "../../ports/out/IOrderRepository";

export default class RemoveProductToOrderService implements IService<Object,Promise<Array<Object>>>{

    repo: IOrderRepository;

    constructor(repo:IOrderRepository){
        this.repo = repo
    }
       
    async execute(data:Object): Promise<Array<Object>> {

        return new Promise((resolve, reject) => {

            this.repo.getOpenOrderByCustomerId(data)
            .then((order) => {

                if (order?.length > 0) {

                    this.repo.removeProductToOrder({order_id: order[0].id, product_id: data.product_id}).then((result) => {
                        console.log("Product added to existing order:", result);
                        resolve(result);
                    }).catch((error) => {
                        console.error("Error adding product to existing order:", error);
                        reject(error);  
                    })
                    
                } else{
                    reject({
                        status: 404,
                        message: "No open order found for the customer"
                    });
                }
            }).catch((error) => {   
                console.error("Error adding product to order:", error); 
                reject(error);
            })

        })
        
    }


    

}