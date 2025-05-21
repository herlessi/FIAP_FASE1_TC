import AuthController from "../controllers/AuthController";


const express = require('express')
const router = express.Router()

let authController:AuthController;


router.post('/login', async (req:Request, res:Response) => {
   let retorno = await authController.login(req) 
   res.status(200).json(retorno)
});


module.exports = function (ctrl:AuthController){
    authController = ctrl
    return router
}