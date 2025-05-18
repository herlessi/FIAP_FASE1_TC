import IRepository from "../../../../core/application/ports/out/IRepository";
import CustomerSaveService from "../../../../core/application/services/user/CustomerSaveService";
import UserCostumer from "../../../../core/domain/UserCostumer";

export default class CustomerController{

    repo: IRepository;

    constructor(repo:IRepository){
        this.repo = repo
    }

    async save(req:Request):any{

        let data = req.body
        if(!data){
            return {
                status: 400,
                message: "Dados não informados"
            }
        }
        
        if(!data.nome){
            return {
                status: 400,
                message: "Nome é obrigatório"
            }
        }
        if(!data.email){
            return {
                status: 400,
                message: "Email é obrigatório"
            }
        }
        
        
        const customerSaveService = new CustomerSaveService(this.repo)
        let retorno = await customerSaveService.execute(new UserCostumer(null, data.nome, data.email,null,1,null,null,null))
        return retorno
    }
       
   

}