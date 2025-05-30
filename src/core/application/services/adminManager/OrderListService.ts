import UserCostumer from "../../../domain/UserCostumer";
import IService from "../../ports/in/InServices";
import IRepository from "../../ports/out/IRepository";

export default class OrderListService implements IService<UserCostumer,Promise<Array<Object>>>{

    repo: IRepository;

    constructor(repo:IRepository){
        this.repo = repo
    }
       
    async execute(data:Object): Promise<Array<Object>> {

        return await this.repo.listOrders({'order.fl_status':data.fl_status})
        
    }


    

}