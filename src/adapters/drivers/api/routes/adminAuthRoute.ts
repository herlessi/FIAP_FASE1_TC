import AdminAuthController from "../controllers/AdminAuthController";


const express = require('express')
const router = express.Router()

let adminAuthController:AdminAuthController;


router.post('/login', async (req:Request, res:Response) => {
   let returnData = await adminAuthController.login(req) 
   res.status(returnData.status).json(returnData)
});



module.exports = function (ctrl:AdminAuthController){
    adminAuthController = ctrl
    return router
}