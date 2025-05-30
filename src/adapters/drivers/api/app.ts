import { INotification } from "../../../core/application/ports/out/INotification";
import IRepository from "../../../core/application/ports/out/IRepository";
import SenderEmail from "../../drivens/notification/SenderEmail";
import CustomerRepositoryInMemory from "../../drivens/repository/inMemory/CustomerRepositoryInMemory";
import AdminRepositoryPG from "../../drivens/repository/postgres/AdminRepositoryPG";
import CustomerRepositoryPG from "../../drivens/repository/postgres/CustomerRepositoryPG";
import OrderRepositoryPG from "../../drivens/repository/postgres/OrderRepositoryPG";
import PaymentRepositoryPG from "../../drivens/repository/postgres/PaymentRepositoryPG";
import ProductRepositoryPG from "../../drivens/repository/postgres/ProductRepositoryPG";
import UserRepositoryPG from "../../drivens/repository/postgres/UserRepositoryPG";
import AdminAuthController from "./controllers/AdminAuthController";
import AdminCustomerController from "./controllers/AdminCustomerController";
import AdminProductController from "./controllers/AdminProductController";
import AdminUserController from "./controllers/AdminUserController";
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

const adminauthrepo:IRepository = new AdminRepositoryPG()
const adminAuthCtrl:AdminAuthController = new AdminAuthController(adminauthrepo)
app.use('/auth/admin', require('./routes/adminAuthRoute')(adminAuthCtrl));


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
const prodNotification:INotification = new SenderEmail()
const prodctrl:ProductionController = new ProductionController(orderrepo,prodNotification)
app.use('/production',require('./routes/productionRoute')(prodctrl,authCtrl,prodNotification));


const adminCustomerRepo:IRepository = new CustomerRepositoryPG();
const adminCustomerCtrl:AdminCustomerController = new AdminCustomerController(adminCustomerRepo)
app.use('/admin/customer',require('./routes/adminCustomerRoute')(adminCustomerCtrl,adminAuthCtrl));

const adminUserRepo:IRepository = new UserRepositoryPG();
const adminUsersCtrl:AdminUserController = new AdminUserController(adminUserRepo)
app.use('/admin/users',require('./routes/adminUsersRoute')(adminUsersCtrl,adminAuthCtrl));


const adminProdRepo:IRepository = new ProductRepositoryPG();
const adminProdCtrl:AdminProductController = new AdminProductController(adminProdRepo)
app.use('/admin/products',require('./routes/adminProductsRoute')(adminProdCtrl,adminAuthCtrl));

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});