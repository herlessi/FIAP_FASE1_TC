import IRepository from "../../../core/application/ports/out/IRepository";
import CustomerRepositoryInMemory from "../../drivens/repository/inMemory/CustomerRepositoryInMemory";
import CustomerRepositoryPG from "../../drivens/repository/postgres/CustomerRepositoryPG";
import AuthController from "./controllers/AuthController";
import CustomerController from "./controllers/CustomerController";
require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
// carregado via docker compose
const PORT = process.env.PORTA;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
const authrepo:IRepository = new CustomerRepositoryInMemory()
const authCtrl:AuthController = new AuthController(authrepo)
app.use('/auth', require('./routes/authRoute')(authCtrl));


const repo:IRepository = new CustomerRepositoryInMemory()
const ctrl:CustomerController = new CustomerController(repo)
app.use('/customer', require('./routes/customerRoute')(ctrl,authCtrl));



// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});