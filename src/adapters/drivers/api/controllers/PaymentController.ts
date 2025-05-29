import IRepository from "../../../../core/application/ports/out/IRepository";
import OrderCategoryListService from "../../../../core/application/services/orderMaganer/OrderCategoryListService";
import PaymentSaveService from "../../../../core/application/services/orderMaganer/PaymentSaveService";


export default class PaymentController{

    repo: IRepository;

    constructor(repo:IRepository){
        this.repo = repo
    }

    public async savePayment(req:Request):any{
        let data = {}
        if(req.body) {
            data = req.body
        }
        
        const paymentSaveService = new PaymentSaveService(this.repo)
        let retorno =  await paymentSaveService.execute(data).then(res => res).catch(err => err)
        return retorno
    }

       
   

}