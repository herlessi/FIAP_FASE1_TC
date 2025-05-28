const express = require('express')
const router = express.Router()

import { Request, Response } from 'express';
import AuthController from "../controllers/AuthController";
import OrderController from "../controllers/OrderController";



let orderController:any;
let authController:any;

router.use((req:Request, res:Response, next:Function) => {
    authController.loginVerify(req,res,next)    
})

router.get('/categories', async (req:Request, res:Response) => {
   let retorno = await orderController.listCategories(req) 
   res.status(200).json(retorno)
});

router.get('/categories/:category_id/products', async (req:Request, res:Response) => {
   let retorno = await orderController.listProductsByCategory(req) 
   res.status(200).json(retorno)
});

router.get('/categories/products/:product_id', async (req:Request, res:Response) => {
   let retorno = await orderController.listProductById(req) 
   res.status(200).json(retorno)
});

router.post('/cart/addproduct', async (req:Request, res:Response) => {
   let retorno = await orderController.addProductToOrder(req) 
   res.status(200).json(retorno)
});

router.delete('/cart/removeproduct', async (req:Request, res:Response) => {
   let retorno = await orderController.removeProductToOrder(req) 
   res.status(200).json(retorno)
});

router.get('/cart/:order_id/products', async (req:Request, res:Response) => {
   let retorno = await orderController.getProductsFromOrder(req) 
   res.status(200).json(retorno)
});



// router.get('/', async (req:Request, res:Response) => {
//    let retorno = await customerController.list(req) 
//    res.status(200).json(retorno)
// });




module.exports = function (ctrl:OrderController,authctrl:AuthController){
    orderController = ctrl
    authController = authctrl
    return router
}