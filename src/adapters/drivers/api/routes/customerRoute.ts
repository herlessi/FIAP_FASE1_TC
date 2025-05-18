import CustomerController from "../controllers/CustomerController";


const express = require('express')
const router = express.Router()

let customerController:CustomerController;

// Example route to get all users
router.post('/save', async (req:Request, res:Response) => {
   let retorno = await customerController.save(req) 
   res.status(200).json(retorno)
});


module.exports = function (ctrl:CustomerController){
    customerController = ctrl
    return router
}