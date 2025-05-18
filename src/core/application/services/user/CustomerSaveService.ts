import CustomerRepositoryPG from "../../../../adapters/drivens/repository/postgres/CustomerRepositoryPG";
import UserCostumer from "../../../domain/UserCostumer";
import IService from "../../ports/in/InServices";

export default class CustomerSaveService implements IService<UserCostumer,string>{

    repo: CustomerRepositoryPG;

    constructor(repo:CustomerRepositoryPG){
        this.repo = repo
    }
       
    execute(
        data:UserCostumer
    ): string {

        this.repo.save(data)
        return
        
    }


    

}