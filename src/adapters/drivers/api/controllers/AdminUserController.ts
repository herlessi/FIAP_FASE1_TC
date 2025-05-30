import IRepository from "../../../../core/application/ports/out/IRepository";
import UserDeleteService from "../../../../core/application/services/adminManager/UserDeleteService";
import UserListService from "../../../../core/application/services/adminManager/UserListService";
import UserSaveService from "../../../../core/application/services/adminManager/UserSaveService";
import UserUpdateService from "../../../../core/application/services/adminManager/UserUpdateService";
import CustomerDeleteService from "../../../../core/application/services/authentication/CustomerDeleteService";
import CustomerListService from "../../../../core/application/services/authentication/CustomerListService";
import CustomerSaveService from "../../../../core/application/services/authentication/CustomerSaveService";
import CustomerUpdateService from "../../../../core/application/services/authentication/CustomerUpdateService";
import UserAdmin from "../../../../core/domain/UserAdmin";
import UserCostumer from "../../../../core/domain/UserCostumer";

export default class AdminUserController{

    repo: IRepository;

    constructor(repo:IRepository){
        this.repo = repo
    }


    async list(req:Request):any{
        let data = {}

        if(req.query) {
            data = req.query
        }
   
        
        const userListService = new UserListService(this.repo)
        const user = new UserAdmin(data.id,data.name,data.surname,data.birthdate, data.email,1,data.password,null,null,null)
        let retorno = await userListService.execute(user)
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
        
        if(!data.name){
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

        if(!data.password){
            return {
                status: 400,
                message: "Password é obrigatório"
            }
        }
        
       
        
        
        const userSaveService = new UserSaveService(this.repo)
        let retorno = await userSaveService.execute(new UserAdmin(data.id,data.name,data.surname,data.birthdate, data.email,1,data.password,null,null,null))
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
         
        
        const userUpdateService = new UserUpdateService(this.repo)
        let retorno = await userUpdateService.execute(new UserAdmin(data.id,data.name,data.surname,data.birthdate, data.email,1,data.password,null,null,null))
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
        
        
        const userDeleteService = new UserDeleteService(this.repo)
        let retorno = await userDeleteService.execute(new UserAdmin(data.id,data.name,data.surname,data.birthdate, data.email,1,data.password,null,null,null))
        return retorno
    }
       
   

}