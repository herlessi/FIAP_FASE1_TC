import IRepository from "../../../core/application/ports/out/IRepository";
import CustomerRepositoryPG from "../../drivens/repository/postgres/CustomerRepositoryPG";
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
const repo:IRepository = new CustomerRepositoryPG()
const ctrl:CustomerController = new CustomerController(repo)
app.use('/customer', require('./routes/customerRoute')(ctrl));



// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});