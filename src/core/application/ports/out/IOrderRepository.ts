import AUser from "../../../domain/shared/Abstracts/AUser";

export default interface IOrderRepository{
    save(user:AUser):boolean;
    list(user:Object):Array<AUser>;
    listCategories(data:Object):Promise<Array<Object>>;
    listProductsByCategory(data:Object):Promise<Array<Object>>;
    listProductById(data:Object):Promise<Array<Object>>;
    getOrderByCustomerId(data:Object):Promise<Array<Object>>;
    getOpenOrderByCustomerId(data:Object):Promise<Array<Object>>;
    createOrder(customer_id:number):Promise<Array<Object>>;
    addProductToOrder(data:Object):Promise<Array<Object>>;
    removeProductToOrder(data:Object):Promise<Array<Object>>;
    getProductsFromOrder(data:Object):Promise<Array<Object>>;
}