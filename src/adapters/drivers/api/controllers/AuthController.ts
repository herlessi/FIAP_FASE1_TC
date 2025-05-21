import IRepository from "../../../../core/application/ports/out/IRepository";
import CostumerAuthService from "../../../../core/application/services/authentication/CostumerAuthService";
import CostumerAuthVerifyService from "../../../../core/application/services/authentication/CostumerAuthVerifyService";

export default class AuthController {
    
    repo: IRepository;

    constructor(repo:IRepository){
        this.repo = repo
    }

    async login(req: Request): Promise<Object> {
        let data = req.body
        if (!data) {
            return {
                status: 400,
                message: "Dados não informados"
            }
        }

        if (!data.cpf) {
            return {
                status: 400,
                message: "CPF é obrigatório"
            }
        }

        const customerAuthService = new CostumerAuthService(this.repo)
        let retorno = await customerAuthService.execute({cpf:data.cpf,nome:data.nome,email:data.email})
        return retorno
    }

    async loginVerify(req: Request, res:Response, next:()=>void): void {


        let token = req.headers['authorization']
        if (!token) {
            let retorno =  {
                status: 400,
                message: "Token não informado"
            }
            res.status(401).json(retorno)
        }else{
            const customerAuthVerifyService = new CostumerAuthVerifyService(this.repo)
            let retorno = await customerAuthVerifyService.execute(token)
            if(retorno?.status == 200 && retorno?.decoded){
                req.tokeninfo = retorno.decoded
                next()
            }else{

                res.status(retorno.status).json({message:retorno.message})
            }
            
        }

    }
}