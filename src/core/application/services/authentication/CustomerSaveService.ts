import CustomerRepositoryPG from "../../../../adapters/drivens/repository/postgres/CustomerRepositoryPG";
import AUser from "../../../domain/shared/Abstracts/AUser";
import UserCostumer from "../../../domain/UserCostumer";
import IService from "../../ports/in/InServices";
import IRepository from "../../ports/out/IRepository";

export default class CustomerSaveService implements IService<UserCostumer,boolean>{

    repo: IRepository;

    constructor(repo:IRepository){
        this.repo = repo
    }
       
    async execute(data:UserCostumer): boolean {

        return this.repo.save({nome:data.nome,email:data.email})
        
    }


    

}