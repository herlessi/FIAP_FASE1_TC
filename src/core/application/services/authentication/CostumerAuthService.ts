import CustomerRepositoryPG from "../../../../adapters/drivens/repository/postgres/CustomerRepositoryPG";
import IService from "../../ports/in/InServices";
require('dotenv').config()
import jwt from 'jsonwebtoken';

export default class CostumerAuthService implements IService<Object,Object>{

    repo: CustomerRepositoryPG;
    private JWT_SECRET:string = process.env.JWT_SECRET

    constructor(repo:CustomerRepositoryPG){
        this.repo = repo
    }
       
    async execute(data:Object): Object {

        console.log('data ',data)
        const payload = data
        const expiresIn = '1h'
        let retorno = {
                    status: 500,
                    message: "Erro ao gerar token"
                }
        await jwt.sign(payload, this.JWT_SECRET, { expiresIn }, (err, token) => {
            if (err) {
                retorno = {
                    status: 500,
                    message: "Erro ao gerar token"
                }
            } else {
                retorno = {
                    status: 200,
                    token: token
                }
            }
        })

        return retorno
        
    }


    

}