import IService from "../../ports/in/InServices";
import jwt from 'jsonwebtoken';
import IRepository from "../../ports/out/IRepository";

export default class CostumerAuthVerifyService implements IService<string,Object>{

    repo: IRepository;
    private JWT_SECRET:string = process.env.JWT_SECRET

    constructor(repo:IRepository){
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