import CustomerRepositoryPG from "../../../../adapters/drivens/repository/postgres/CustomerRepositoryPG";
import IService from "../../ports/in/InServices";
require('dotenv').config()
import jwt from 'jsonwebtoken';

export default class CostumerAuthVerifyService implements IService<string,Object>{

    repo: CustomerRepositoryPG;
    private JWT_SECRET:string = process.env.JWT_SECRET

    constructor(repo:CustomerRepositoryPG){
        this.repo = repo
    }
       
    async execute(token:string): Object {

        console.log('token ',token)
        let retorno = {
                    status: 500,
                    message: "Não foi possivel verificar o token"
                }
        await jwt.verify(token, this.JWT_SECRET, (err, decoded) => {
            if (err) {
                retorno = {
                    status: 500,
                    message: "Não foi possivel verificar o token"
                }
            } else {
                retorno = {
                    status: 200,
                    decoded: decoded
                }
            }
        })

        return retorno
        
    }


    

}