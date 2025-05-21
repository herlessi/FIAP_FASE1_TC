import IRepository from "../../../core/application/ports/out/IRepository";
import CustomerRepositoryPG from "../../drivens/repository/postgres/CustomerRepositoryPG";
import AuthController from "./controllers/AuthController";
import CustomerController from "./controllers/CustomerController";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
const authrepo:IRepository = new CustomerRepositoryPG()
const authCtrl:AuthController = new AuthController(authrepo)
app.use('/auth', require('./routes/authRoute')(authCtrl));


const repo:IRepository = new CustomerRepositoryPG()
const ctrl:CustomerController = new CustomerController(repo)
app.use('/customer', require('./routes/customerRoute')(ctrl,authCtrl));



// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});