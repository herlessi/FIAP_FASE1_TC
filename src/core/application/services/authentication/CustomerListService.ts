import UserCostumer from "../../../domain/UserCostumer";
import IService from "../../ports/in/InServices";
import IRepository from "../../ports/out/IRepository";

export default class CustomerListService implements IService<UserCostumer,Promise<Array<Object>>>{

    repo: IRepository;

    constructor(repo:IRepository){
        this.repo = repo
    }
       
    async execute(data:UserCostumer): Promise<Array<Object>> {

        return await this.repo.list({id:data.id,cpf:data.cpf,name:data.name,email:data.email})
        
    }


    

}