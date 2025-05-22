import AuthController from "../controllers/AuthController";


const express = require('express')
const router = express.Router()

let authController:AuthController;


router.post('/login', async (req:Request, res:Response) => {
   let returnData = await authController.login(req) 
   res.status(200).json(returnData)
});

router.post('/anonymouslogin', async (req:Request, res:Response) => {
   let returnData = await authController.anonymouslogin() 
   res.status(200).json(returnData)
});

router.post('/newcostumer', async (req:Request, res:Response) => {
   let returnData = await authController.newcostumer(req) 
   res.status(200).json(returnData)
});


module.exports = function (ctrl:AuthController){
    authController = ctrl
    return router
}