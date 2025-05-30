import IRepository from "../../../../core/application/ports/out/IRepository";
import OrderListService from "../../../../core/application/services/adminManager/OrderListService";
import OrderCategoryListService from "../../../../core/application/services/orderMaganer/OrderCategoryListService";
import PaymentSaveService from "../../../../core/application/services/orderMaganer/PaymentSaveService";
import SetStatusOrderService from "../../../../core/application/services/orderMaganer/setStatusOrderService";
import EnumOrderStatus from "../../../../core/domain/shared/Enums/EnumOrderStatus";


export default class ProductionController{

    repo: IRepository;
    notificator: INotification;

    constructor(repo:IRepository,notificator:INotification){
        this.repo = repo
        this.notificator = notificator
    }


    public async setStatusOrder(req:Request):any{
        
        if(req?.params?.order_id && req?.params?.idstatus){
        
            // const paymentSaveService = new PaymentSaveService(this.repo)
            const orderservice = new SetStatusOrderService(this.repo)
            let obj = {order_id:req.params.order_id, fl_status:req.params.idstatus}
            let retorno =  await orderservice.execute(obj).then(res =>{
                 let statusName = EnumOrderStatus[req.params.idstatus as keyof typeof EnumOrderStatus]
                 this.notificator.send("Status alterado para "+statusName)
                 return res
            }).catch(err => {
                return err
            })
            return retorno

        }
    }

    public async listOrders(req:Request):any{
        let data = {}
        if(req.query) {
            data = req.query
        }
        if(!data.fl_status){
            return {
                status: 400,
                message: "fl_status não informados"
            }
        }
        
        const orderListService = new OrderListService(this.repo)
        let retorno = await orderListService.execute({fl_status:data.fl_status})
        return retorno
    }

       
   

}