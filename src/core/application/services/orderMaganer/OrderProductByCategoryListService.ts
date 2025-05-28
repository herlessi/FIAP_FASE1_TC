import IService from "../../ports/in/InServices";
import IOrderRepository from "../../ports/out/IOrderRepository";

export default class OrderProductByCategoryListService implements IService<Object,Promise<Array<Object>>>{

    repo: IOrderRepository;

    constructor(repo:IOrderRepository){
        this.repo = repo
    }
       
    async execute(data:Object): Promise<Array<Object>> {

        return await this.repo.listProductsByCategory(data)
        
    }


    

}