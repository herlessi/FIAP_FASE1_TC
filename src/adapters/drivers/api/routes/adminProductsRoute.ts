import AdminAuthController from "../controllers/AdminAuthController";
import AdminProductController from "../controllers/AdminProductController";


const express = require('express')
const router = express.Router()

let adminProductController:AdminProductController;
let adminAuthController:AdminAuthController;

router.use((req:Request, res:Response, next:Function) => {
    adminAuthController.loginVerify(req,res,next)    
})

router.get('/', async (req:Request, res:Response) => {
   let retorno = await adminProductController.list(req) 
   res.status(200).json(retorno)
});

router.post('/', async (req:Request, res:Response) => {
   let retorno = await adminProductController.save(req) 
   res.status(200).json(retorno)
});

router.put('/', async (req:Request, res:Response) => {
   let retorno = await adminProductController.update(req) 
   res.status(200).json(retorno)
});

router.delete('/', async (req:Request, res:Response) => {
   let retorno = await adminProductController.delete(req) 
   res.status(200).json(retorno)
});




module.exports = function (ctrl:AdminProductController,authctrl:AdminAuthController){
    adminProductController = ctrl
    adminAuthController = authctrl
    return router
}