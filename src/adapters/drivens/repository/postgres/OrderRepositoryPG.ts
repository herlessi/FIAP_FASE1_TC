import IOrderRepository from "../../../../core/application/ports/out/IOrderRepository";
import AUser from "../../../../core/domain/shared/Abstracts/AUser";
import Helper from "../../../../core/domain/shared/Helper";
const config = require('../../../../../knexfile.js');

export default class OrderRepositoryPG implements IOrderRepository{
    
    
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


    listCategories(data: Object): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            this.dbpg('category').select('*')
            .then((rows: any) => {
                resolve(Array.from(rows));
            }).catch((error: any) => {
                console.error("Error listing categories:", error); 
                reject(false)
            });
        })
    }

    listProductsByCategory(data: Object): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            this.dbpg('product').select('*').where({category_id: data.category_id})
            .then((rows: any) => {
                resolve(Array.from(rows));
            }).catch((error: any) => {
                console.error("Error listing products by category:", error); 
                reject(false)
            });
        })
    }

    
    
    listProductById(data: Object): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            this.dbpg('product').select('*').where({id: data.product_id})
            .then((rows: any) => {
                resolve(Array.from(rows));
            }).catch((error: any) => {
                console.error("Error listing products by category:", error); 
                reject(false)
            });
        })
    }

    setOrderStatus(data: Object): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            this.dbpg('order').update({fl_status:data.fl_status}).where({id: data.order_id}).returning('*')
            .then((rows: any) => {
                resolve(Array.from(rows));
            }).catch((error: any) => {
                console.error("Error listing products by category:", error); 
                reject(false)
            });
        })
    }

    getOrderByCustomerId(data: object): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            this.dbpg('order').select('*').where({customer_id: data.customer_id})
            .then((rows: any) => {
                resolve(Array.from(rows));
            }).catch((error: any) => {
                console.error("Error getting order by ID:", error); 
                reject(false)
            });
        })
    }   

    getOpenOrderByCustomerId(data: object): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            this.dbpg('order').select('*').where({customer_id: data.customer_id, fl_status: 1})
            .then((rows: any) => {
                resolve(Array.from(rows));
            }).catch((error: any) => {
                console.error("Error getting order by ID:", error); 
                reject(false)
            });
        })
    }   

    getProductsFromOrder(data: Object): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            this.dbpg('order_product')
                .join('product', 'order_product.product_id', 'product.id')
                .join('order', 'order_product.order_id', 'order.id')
                .select('order.id','order.customer_id','order_product.quantity', 'product.*')
                .where({order_id: data.order_id, 'product.fl_status': true})
                .then((rows: any) => {
                    resolve(Array.from(rows));
                }).catch((error: any) => {
                    console.error("Error getting products from order:", error); 
                    reject(false)
                });
        })
    }

    addProductToOrder(data: Object): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            this.dbpg('order_product').insert({
                order_id: data.order_id,
                quantity: data.quantity,
                product_id: data.product_id,
            }).returning('*')
            .then((resp) => {
                resolve(Array.from(resp));
            }).catch((error: any) => {
                console.error("Error adding product to order:", error); 
                reject(false)
            });
        })
    }

    removeProductToOrder(data: Object): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            this.dbpg('order_product').update({fl_status: false}).where({
                order_id: data.order_id,
                product_id: data.product_id
            }).returning('*')
            .then((resp) => {
                resolve(Array.from(resp));
            }).catch((error: any) => {
                console.error("Error adding product to order:", error); 
                reject(false)
            });
        })
    }

    createOrder(customer_id: number): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            this.dbpg('order').insert({
                customer_id: customer_id,
                fl_status:1
            }).returning('*')
            .then((resp) => {
                resolve(Array.from(resp));
            }).catch((error: any) => {
                console.error("Error creating order:", error); 
                reject(false)
            });
        })
    }

    listOrders(data: Object): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {

            let obj = Helper.cleanObject(data)
            this.dbpg('order')
                .join('customer','customer.id','order.customer_id')
            .select('order.*','customer.name','customer.email').where(obj)
            .then((rows: any) => {
                resolve(Array.from(rows));
            }).catch((error: any) => {
                console.error("Error listing products by category:", error); 
                reject(false)
            });
        })
    }
    
 
}