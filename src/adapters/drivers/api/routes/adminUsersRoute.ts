import AdminAuthController from "../controllers/AdminAuthController";
import AdminCustomerController from "../controllers/AdminCustomerController";
import AdminUserController from "../controllers/AdminUserController";


const express = require('express')
const router = express.Router()

let adminUserController:AdminUserController;
let adminAuthController:AdminAuthController;

router.use((req:Request, res:Response, next:Function) => {
    adminAuthController.loginVerify(req,res,next)    
})

router.get('/', async (req:Request, res:Response) => {
   let retorno = await adminUserController.list(req) 
   res.status(200).json(retorno)
});

router.post('/', async (req:Request, res:Response) => {
   let retorno = await adminUserController.save(req) 
   res.status(200).json(retorno)
});

router.put('/', async (req:Request, res:Response) => {
   let retorno = await adminUserController.update(req) 
   res.status(200).json(retorno)
});

router.delete('/', async (req:Request, res:Response) => {
   let retorno = await adminUserController.delete(req) 
   res.status(200).json(retorno)
});




module.exports = function (ctrl:AdminUserController,authctrl:AdminAuthController){
    adminUserController = ctrl
    adminAuthController = authctrl
    return router
}