import IService from "../../ports/in/InServices";
import IOrderRepository from "../../ports/out/IOrderRepository";

export default class AddProductToOrderService implements IService<Object,Promise<Array<Object>>>{

    repo: IOrderRepository;

    constructor(repo:IOrderRepository){
        this.repo = repo
    }
       
    async execute(data:Object): Promise<Array<Object>> {

        return new Promise((resolve, reject) => {

            this.repo.getOpenOrderByCustomerId(data)
            .then((order) => {

                if (order?.length > 0) {

                    this.repo.addProductToOrder({order_id: order[0].id,quantity:data.quantity, product_id: data.product_id}).then((result) => {
                        console.log("Product added to existing order:", result);
                        resolve(result);
                    }).catch((error) => {
                        console.error("Error adding product to existing order:", error);
                        reject(error);  
                    })
                    
                } else {
                    // No existing order, create a new one
                    return this.repo.createOrder(data.customer_id).then((newOrder) => {
                        // After creating a new order, add the product to it
                        console.log("New order created:", newOrder);
                        if (newOrder?.length > 0) {
                            this.repo.addProductToOrder({order_id: newOrder[0].id,quantity:data.quantity, product_id: data.product_id}).then((result) => {
                                console.log("Product added to new order:", result);
                                resolve(result);
                            }).catch((error) => {
                                console.error("Error adding product to new order:", error);
                                reject(error);
                            })
                        }
                    }).catch((error) => {
                        console.error("Error creating new order:", error);
                        reject(error);
                    })

                }
            }).catch((error) => {   
                console.error("Error adding product to order:", error); 
                reject(error);
            })

        })
        
    }


    

}