import IRepository from "../../../../core/application/ports/out/IRepository";
import ProductDeleteService from "../../../../core/application/services/adminManager/ProductDeleteService";
import ProductListService from "../../../../core/application/services/adminManager/ProductListService";
import ProductSaveService from "../../../../core/application/services/adminManager/ProductSaveService";
import ProductUpdateService from "../../../../core/application/services/adminManager/ProductUpdateService";
import UserDeleteService from "../../../../core/application/services/adminManager/UserDeleteService";
import UserListService from "../../../../core/application/services/adminManager/UserListService";
import UserSaveService from "../../../../core/application/services/adminManager/UserSaveService";
import UserUpdateService from "../../../../core/application/services/adminManager/UserUpdateService";
import CustomerDeleteService from "../../../../core/application/services/authentication/CustomerDeleteService";
import CustomerListService from "../../../../core/application/services/authentication/CustomerListService";
import CustomerSaveService from "../../../../core/application/services/authentication/CustomerSaveService";
import CustomerUpdateService from "../../../../core/application/services/authentication/CustomerUpdateService";
import Product from "../../../../core/domain/Product";
import UserAdmin from "../../../../core/domain/UserAdmin";
import UserCostumer from "../../../../core/domain/UserCostumer";

export default class AdminProductController{

    repo: IRepository;

    constructor(repo:IRepository){
        this.repo = repo
    }


    async list(req:Request):any{
        let data = {}
        console.log('params ',req.query)
        if(req.query) {
            data = req.query
        }
   
        
        const productListService = new ProductListService(this.repo)
        const prod = new Product(data.id,data.category_id,data.name,data.price,null,null)
        let retorno = await productListService.execute(prod)
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
        
        if(!data.category_id){
            return {
                status: 400,
                message: "category_id é obrigatório"
            }
        }

        if(!data.name){
            return {
                status: 400,
                message: "name é obrigatório"
            }
        }

        if(!data.price){
            return {
                status: 400,
                message: "price é obrigatório"
            }
        }
        
       
        
        
        const productSaveService = new ProductSaveService(this.repo)
        let retorno = await productSaveService.execute(new Product(data.id,data.category_id,data.name,data.price,null,null))
        return retorno
    }

    async update(req:Request):any{

        let data = req.body
        if(!data){
            return {
                status: 400,
                message: "Dados não informados"
            }
        }
        
        if(!data.id){
            return {
                status: 400,
                message: "ID é obrigatório"
            }
        }
         
        
        const userUpdateService = new ProductUpdateService(this.repo)
        let retorno = await userUpdateService.execute(new Product(data.id,data.category_id,data.name,data.price,null,null))
        return retorno
    }

    async delete(req:Request):any{

        let data = req.query
        if(!data){
            return {
                status: 400,
                message: "Dados não informados"
            }
        }
        
        if(!data.id){
            return {
                status: 400,
                message: "ID é obrigatório"
            }
        }
        
        
        const userDeleteService = new ProductDeleteService(this.repo)
        let retorno = await userDeleteService.execute(new Product(data.id,data.category_id,data.name,data.price,null,null))
        return retorno
    }
       
   

}