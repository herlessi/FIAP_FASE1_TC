import CustomerRepositoryPG from "../../../../adapters/drivens/repository/postgres/CustomerRepositoryPG";
import AUser from "../../../domain/shared/Abstracts/AUser";
import UserCostumer from "../../../domain/UserCostumer";
import IService from "../../ports/in/InServices";
import IRepository from "../../ports/out/IRepository";

export default class ProductUpdateService implements IService<UserCostumer,Promise<Array<Object>>>{

    repo: IRepository;

    constructor(repo:IRepository){
        this.repo = repo
    }
       
    async execute(data:UserCostumer): Promise<Array<Object>> {

        return this.repo.update({id:data.id,category_id:data.category_id,name:data.name,price:data.price})
        
    }


    

}