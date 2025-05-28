import IRepository from "../../../../core/application/ports/out/IRepository";
import AddProductToOrderService from "../../../../core/application/services/orderMaganer/AddProductToOrderService";
import OrderCategoryListService from "../../../../core/application/services/orderMaganer/OrderCategoryListService";
import OrderProductByCategoryListService from "../../../../core/application/services/orderMaganer/OrderProductByCategoryListService";
import OrderProductByIdListService from "../../../../core/application/services/orderMaganer/OrderProductByIdListService";
import ProductsFromOrderService from "../../../../core/application/services/orderMaganer/ProductsFromOrderService";
import RemoveProductToOrderService from "../../../../core/application/services/orderMaganer/RemoveProductToOrderService";
import UserCostumer from "../../../../core/domain/UserCostumer";

export default class OrderController{

    repo: IRepository;

    constructor(repo:IRepository){
        this.repo = repo
    }

    public async listCategories(req:Request):any{
        let data = {}
        if(req.body) {
            data = req.body
        }
        
        
        const orderCategoryListService = new OrderCategoryListService(this.repo)
        let retorno = await orderCategoryListService.execute(data)
        return retorno
    }

    public async listProductsByCategory(req:Request):any{
        let data = {}
        if(req?.params?.category_id) {
            data = {category_id:req.params.category_id}
        }else{
            return {
                status: 400,
                message: "Categoria não informada"
            }
        }
        
        
        const orderProductsbyCategoryListService = new OrderProductByCategoryListService(this.repo)
        let retorno = await orderProductsbyCategoryListService.execute(data)
        return retorno
    }

    public async listProductById(req:Request):any{

        let data = {}
        if(req?.params?.product_id) {
            data = {product_id:req.params.product_id}
        }else{
            return {
                status: 400,
                message: "Categoria não informada"
            }
        }
        
        const orderProductsbyIdListService = new OrderProductByIdListService(this.repo)
        let retorno = await orderProductsbyIdListService.execute(data)
        return retorno
    }

    public async addProductToOrder(req:Request):any{
        let data = {}
        if(req?.body?.product_id) {
            data = {product_id:req.body.product_id,quantity:(req.body.quantity??1),customer_id:req.tokeninfo.id}
        }else{
            return {
                status: 400,
                message: "Customer não informado"
            }
        }
        
        
        const addProductToOrderService = new AddProductToOrderService(this.repo)
        let retorno = await addProductToOrderService.execute(data)
        return retorno
    }

    public async getProductsFromOrder(req:Request):any{
        let data = {}
        if(req?.params?.order_id) {
            data = {order_id:req.params.order_id,customer_id:req.tokeninfo.id}
        }else{
            return {
                status: 400,
                message: "Customer não informado"
            }
        }
        
        
        const productsFromOrderService = new ProductsFromOrderService(this.repo)
        let retorno = await productsFromOrderService.execute(data)
        return retorno
    }

    public async removeProductToOrder(req:Request):any{
        let data = {}
        if(req?.body?.product_id && req?.body?.product_id) {
            data = {product_id:req.body.product_id,order_id:req.body.order_id,customer_id:req.tokeninfo.id}
        }else{
            return {
                status: 400,
                message: "Customer não informado"
            }
        }
        
        
        const removeProductToOrderService = new RemoveProductToOrderService(this.repo)
        let retorno = await removeProductToOrderService.execute(data)
        return retorno
    }

    async save(req:Request):any{

        let data = req.body
        if(!data){
            return {
                status: 400,
                message: "Dados não informados"
            }
        }
        
        if(!data.cpf){
            return {
                status: 400,
                message: "CPF é obrigatório"
            }
        }
        
        if((!data.name && data.email) || (!data.email && data.name)){
            return {
                status: 400,
                message: "Para cadastrado com nome, email é obrigatório. Para cadastro com Email, nome é obrigatório"
            }
        }
        
        
        const customerSaveService = new CustomerSaveService(this.repo)
        let retorno = await customerSaveService.execute(new UserCostumer(null, data.name, data.email,data.cpf,1,null,null,null))
        return retorno
    }
       
   

}