import IOrderRepository from "../../application/ports/out/IOrderRepository"

export default class OrderManager {

    private repo:IOrderRepository
    
    constructor(repo:IOrderRepository){
        this.repo = repo
    }

    public async addProductToOrder(data:Object): Promise<Array<Object>> {

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


    public async removeProductFromOrder(data:Object): Promise<Array<Object>> {

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

    public async savePayment(data:Object): Promise<Array<Object>> {

        return new Promise((resolve, reject) => {
            
             this.repo.savePayment(data).then(resp =>{
                console.log('resp', resp)
                console.log('----')
                if(resp?.length > 0 && resp[0].fl_status == 1){
                    const orderRepo = new OrderRepositoryPG()
                    orderRepo.setOrderStatus({order_id:data.order_id,fl_status:2}).then(resp2 =>{
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