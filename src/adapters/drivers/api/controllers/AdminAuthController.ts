import IRepository from "../../../../core/application/ports/out/IRepository";
import AdminAuthService from "../../../../core/application/services/adminManager/AdminAuthService";
import CostumerAuthVerifyService from "../../../../core/application/services/authentication/CustomerAuthVerifyService";


export default class AdminAuthController {
    
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

        if (!data.email) {
            return {
                status: 400,
                message: "Email é obrigatório"
            }
        }

        if (!data.password) {
            return {
                status: 400,
                message: "Password é obrigatório"
            }
        }

        const adminAuthService = new AdminAuthService(this.repo)
        let retorno = await adminAuthService.execute({email:data.email,password:data.password})
        return retorno
    }


    async loginVerify(req: Request, res:Response, next:()=>void): void {


        let token = req.headers['authorization']
        token = token?.replace('Bearer ', '').trim()
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