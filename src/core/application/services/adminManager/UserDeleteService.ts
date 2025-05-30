import CustomerRepositoryPG from "../../../../adapters/drivens/repository/postgres/CustomerRepositoryPG";
import AUser from "../../../domain/shared/Abstracts/AUser";
import UserCostumer from "../../../domain/UserCostumer";
import IService from "../../ports/in/InServices";
import IRepository from "../../ports/out/IRepository";

export default class UserDeleteService implements IService<UserCostumer,Promise<Array<Object>>>{

    repo: IRepository;

    constructor(repo:IRepository){
        this.repo = repo
    }
       
    async execute(data:UserCostumer): Promise<Array<Object>> {

        return this.repo.delete({id:data.id,name:data.name,email:data.email,cpf:data.cpf})
        
    }


    

}