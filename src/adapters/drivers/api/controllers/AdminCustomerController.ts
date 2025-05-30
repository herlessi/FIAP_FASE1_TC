import IRepository from "../../../../core/application/ports/out/IRepository";
import CustomerDeleteService from "../../../../core/application/services/authentication/CustomerDeleteService";
import CustomerListService from "../../../../core/application/services/authentication/CustomerListService";
import CustomerSaveService from "../../../../core/application/services/authentication/CustomerSaveService";
import CustomerUpdateService from "../../../../core/application/services/authentication/CustomerUpdateService";
import UserCostumer from "../../../../core/domain/UserCostumer";

export default class AdminCustomerController{

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
   
        
        const customerListService = new CustomerListService(this.repo)
        const user = new UserCostumer(data.id, data.name, data.email, data.cpf, 1, null, null, null)
        let retorno = await customerListService.execute(user)
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
        
        
        const customerUpdateService = new CustomerUpdateService(this.repo)
        let retorno = await customerUpdateService.execute(new UserCostumer(data.id, data.name, data.email,data.cpf,1,null,null,null))
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
        
        
        const customeDeleteService = new CustomerDeleteService(this.repo)
        let retorno = await customeDeleteService.execute(new UserCostumer(data.id, data.name, data.email,data.cpf,1,null,null,null))
        return retorno
    }
       
   

}