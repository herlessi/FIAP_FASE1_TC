import IRepository from "../../../../core/application/ports/out/IRepository";
import CustomerListService from "../../../../core/application/services/authentication/CustomerListService";
import CustomerSaveService from "../../../../core/application/services/authentication/CustomerSaveService";
import UserCostumer from "../../../../core/domain/UserCostumer";

export default class CustomerController{

    repo: IRepository;

    constructor(repo:IRepository){
        this.repo = repo
    }

    async list(req:Request):any{
        let data = {}
        if(req.body) {
            data = req.body
        }
        // if(!data){
        //     return {
        //         status: 400,
        //         message: "Dados não informados"
        //     }
        // }
        
        const customerListService = new CustomerListService(this.repo)
        let retorno = await customerListService.execute(new UserCostumer(data.id, data.name, data.email, data.cpf, 1, null, null, null))
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