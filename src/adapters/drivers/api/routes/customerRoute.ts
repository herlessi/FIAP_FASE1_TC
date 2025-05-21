import AuthController from "../controllers/AuthController";
import CustomerController from "../controllers/CustomerController";


const express = require('express')
const router = express.Router()

let customerController:CustomerController;
let authController:authController;

router.use((req:Request, res:Response, next:Function) => {
    authController.loginVerify(req,res,next)    
})

router.post('/save', async (req:Request, res:Response) => {
   let retorno = await customerController.save(req) 
   res.status(200).json(retorno)
});


module.exports = function (ctrl:CustomerController,authctrl:AuthController){
    customerController = ctrl
    authController = authctrl
    return router
}