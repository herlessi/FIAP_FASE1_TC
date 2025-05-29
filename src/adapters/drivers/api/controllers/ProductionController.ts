import IRepository from "../../../../core/application/ports/out/IRepository";
import OrderCategoryListService from "../../../../core/application/services/orderMaganer/OrderCategoryListService";
import PaymentSaveService from "../../../../core/application/services/orderMaganer/PaymentSaveService";
import SetStatusOrderService from "../../../../core/application/services/orderMaganer/setStatusOrderService";


export default class ProductionController{

    repo: IRepository;

    constructor(repo:IRepository){
        this.repo = repo
    }

    public async setStatusOrder(req:Request):any{
        
        if(req?.params?.order_id && req?.params?.idstatus){
        
            // const paymentSaveService = new PaymentSaveService(this.repo)
            const orderservice = new SetStatusOrderService(this.repo)
            let obj = {order_id:req.params.order_id, fl_status:req.params.idstatus}
            let retorno =  await orderservice.execute(obj).then(res => res).catch(err => err)
            return retorno

        }
    }

       
   

}