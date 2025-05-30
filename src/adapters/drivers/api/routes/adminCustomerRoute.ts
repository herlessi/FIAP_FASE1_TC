import AdminAuthController from "../controllers/AdminAuthController";
import AdminCustomerController from "../controllers/AdminCustomerController";


const express = require('express')
const router = express.Router()

let adminCustomerController:AdminCustomerController;
let adminAuthController:AdminAuthController;

router.use((req:Request, res:Response, next:Function) => {
    adminAuthController.loginVerify(req,res,next)    
})

router.get('/', async (req:Request, res:Response) => {
   let retorno = await adminCustomerController.list(req) 
   res.status(200).json(retorno)
});

router.post('/', async (req:Request, res:Response) => {
   let retorno = await adminCustomerController.save(req) 
   res.status(200).json(retorno)
});

router.put('/', async (req:Request, res:Response) => {
   let retorno = await adminCustomerController.update(req) 
   res.status(200).json(retorno)
});

router.delete('/', async (req:Request, res:Response) => {
   let retorno = await adminCustomerController.delete(req) 
   res.status(200).json(retorno)
});




module.exports = function (ctrl:AdminCustomerController,authctrl:AdminAuthController){
    adminCustomerController = ctrl
    adminAuthController = authctrl
    return router
}