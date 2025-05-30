import CustomerRepositoryPG from "../../../../adapters/drivens/repository/postgres/CustomerRepositoryPG";
import AUser from "../../../domain/shared/Abstracts/AUser";
import UserAdmin from "../../../domain/UserAdmin";
import UserCostumer from "../../../domain/UserCostumer";
import IService from "../../ports/in/InServices";
import IRepository from "../../ports/out/IRepository";

export default class ProductSaveService implements IService<UserCostumer,Promise<Array<Object>>>{

    repo: IRepository;

    constructor(repo:IRepository){
        this.repo = repo
    }
       
    async execute(data:UserAdmin): Promise<Array<Object>> {

        return this.repo.save({category_id:data.category_id,name:data.name,price:data.price}) 
        
    }


    

}