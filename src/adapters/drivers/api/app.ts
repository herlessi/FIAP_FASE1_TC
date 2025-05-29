import IRepository from "../../../core/application/ports/out/IRepository";
import CustomerRepositoryInMemory from "../../drivens/repository/inMemory/CustomerRepositoryInMemory";
import CustomerRepositoryPG from "../../drivens/repository/postgres/CustomerRepositoryPG";
import OrderRepositoryPG from "../../drivens/repository/postgres/OrderRepositoryPG";
import PaymentRepositoryPG from "../../drivens/repository/postgres/PaymentRepositoryPG";
import AuthController from "./controllers/AuthController";
import CustomerController from "./controllers/CustomerController";
import OrderController from "./controllers/OrderController";
import PaymentController from "./controllers/PaymentController";
import ProductionController from "./controllers/ProductionController";
require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const iniciarDB = require('../../../scripts/iniciarDB');


const app = express();
// carregado via docker compose
const PORT = process.env.PORTA;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
const authrepo:IRepository = new CustomerRepositoryPG()
const authCtrl:AuthController = new AuthController(authrepo)
app.use('/auth', require('./routes/authRoute')(authCtrl));


const repo:IRepository = new CustomerRepositoryPG();
const ctrl:CustomerController = new CustomerController(repo)
app.use('/customer', require('./routes/customerRoute')(ctrl,authCtrl));

const orderrepo:IRepository = new OrderRepositoryPG();
const orderctrl:OrderController = new OrderController(orderrepo)
app.use('/order',require('./routes/orderRoute')(orderctrl,authCtrl));

const paymentrepo:IRepository = new PaymentRepositoryPG();
const paymentctrl:PaymentController = new PaymentController(paymentrepo)
app.use('/payment',require('./routes/paymentRoute')(paymentctrl,authCtrl));

// orderrepo = aproveitando o repositorio do mesmo contexto
const prodctrl:ProductionController = new ProductionController(orderrepo)
app.use('/production',require('./routes/productionRoute')(prodctrl,authCtrl));

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});