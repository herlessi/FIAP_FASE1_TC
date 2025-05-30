const express = require('express')
const router = express.Router()

import { Request, Response } from 'express';
import AuthController from "../controllers/AuthController";
import ProductionController from '../controllers/ProductionController';



let productionController:any;
let authController:any;

router.use((req:Request, res:Response, next:Function) => {
    authController.loginVerify(req,res,next)    
})

router.get('/orders', async (req:Request, res:Response) => {
    let retorno = await productionController.listOrders(req) 
    res.status(200).json(retorno)
}); 


router.delete('/cancel/:order_id', async (req:Request, res:Response) => {
    req.params.idstatus = 7
    let retorno = await productionController.setStatusOrder(req) 
    res.status(200).json(retorno)
}); 

router.put('/accept/:order_id', async (req:Request, res:Response) => {
    req.params.idstatus = 3
    let retorno = await productionController.setStatusOrder(req) 
    res.status(200).json(retorno)
}); 

router.put('/preparation/:order_id', async (req:Request, res:Response) => {
    req.params.idstatus = 4
    let retorno = await productionController.setStatusOrder(req) 
    res.status(200).json(retorno)
}); 

router.put('/ready/:order_id', async (req:Request, res:Response) => {
    req.params.idstatus = 5
    let retorno = await productionController.setStatusOrder(req) 
    res.status(200).json(retorno)
}); 

router.put('/finish/:order_id', async (req:Request, res:Response) => {
    req.params.idstatus = 6
    let retorno = await productionController.setStatusOrder(req) 
    res.status(200).json(retorno)
}); 




module.exports = function (ctrl:ProductionController,authctrl:AuthController){
    productionController = ctrl
    authController = authctrl
    return router
}