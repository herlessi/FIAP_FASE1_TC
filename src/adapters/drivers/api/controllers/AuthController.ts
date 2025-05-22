import IRepository from "../../../../core/application/ports/out/IRepository";
import CustomerAuthService from "../../../../core/application/services/authentication/CustomerAuthService";
import CostumerAuthVerifyService from "../../../../core/application/services/authentication/CustomerAuthVerifyService";
import CustomerSaveService from "../../../../core/application/services/authentication/CustomerSaveService";


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

        const customerAuthService = new CustomerAuthService(this.repo)
        let retorno = await customerAuthService.execute({cpf:data.cpf,nome:data.nome,email:data.email})
        return retorno
    }


    async anonymouslogin(): Promise<Object> {
        let dataIdentity = new Date().getMilliseconds() + Math.random().toString(36).substring(2, 15)
        const customerAuthService = new CustomerAuthService(this.repo)
        let retorno = await customerAuthService.execute({anonymousid:dataIdentity})
        return retorno
    }

    async newcostumer(req: Request): Promise<Object> {

        let data = req.body
        if (!data) {
            return {
                status: 400,
                message: "Dados não informados"
            }
        }

        if (!data.nome) {
            return {
                status: 400,
                message: "Nome é obrigatório" 
            }
        }

        if (!data.email) {
            return {
                status: 400,
                message: "Email é obrigatório"
            }
        }

        const customerSaveService = new CustomerSaveService(this.repo)
        let retorno = await customerSaveService.execute({nome:data.nome,email:data.email})
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