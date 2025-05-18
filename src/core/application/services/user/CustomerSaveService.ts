import CustomerRepositoryPG from "../../../../adapters/drivens/repository/postgres/CustomerRepositoryPG";
import AUser from "../../../domain/Abstracts/AUser";
import UserCostumer from "../../../domain/UserCostumer";
import IService from "../../ports/in/InServices";

export default class CustomerSaveService implements IService<UserCostumer,boolean>{

    repo: CustomerRepositoryPG;

    constructor(repo:CustomerRepositoryPG){
        this.repo = repo
    }
       
    async execute(
        data:UserCostumer
    ): boolean {

        return this.repo.save(data)
        
    }


    

}