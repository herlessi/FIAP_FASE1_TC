const express = require('express')
const router = express.Router()

import { Request, Response } from 'express';
import AuthController from "../controllers/AuthController";
import PaymentController from '../controllers/PaymentController';



let paymentController:any;
let authController:any;

router.use((req:Request, res:Response, next:Function) => {
    authController.loginVerify(req,res,next)    
})


router.post('/checkout', async (req:Request, res:Response) => {
   let retorno = await paymentController.savePayment(req) 
   res.status(200).json(retorno)
});


router.post('/checkout/negado', async (req:Request, res:Response) => {
   let retorno = await paymentController.savePayment(req) 
   res.status(retorno.code).json(retorno.message)
});




module.exports = function (ctrl:PaymentController,authctrl:AuthController){
    paymentController = ctrl
    authController = authctrl
    return router
}