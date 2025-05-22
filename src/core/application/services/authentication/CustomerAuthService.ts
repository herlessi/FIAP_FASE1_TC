import IService from "../../ports/in/InServices";
import jwt from 'jsonwebtoken';
import IRepository from "../../ports/out/IRepository";

export default class CostumerAuthService implements IService<Object,Object>{

    repo: IRepository;
    private JWT_SECRET:string = process.env.JWT_SECRET

    constructor(repo:IRepository){
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