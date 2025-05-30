import IService from "../../ports/in/InServices";
import IRepository from "../../ports/out/IRepository";
import Authentication from "../../../domain/authentication/Authentication";

export default class AdminAuthService implements IService<Object,Object>{

    repo: IRepository;
    private JWT_SECRET:string = process.env.JWT_SECRET

    constructor(repo:IRepository){
        this.repo = repo
    }
       
    async execute(user:Object): Object {

        return new Promise((resolve, reject) => {
            this.repo.checkLogin(user).then(async resp =>{
                
                if(resp?.length > 0){
                    const auth = new Authentication(this.repo)
                    let retorno = await auth.authenticate(resp[0])
                    resolve(retorno)
                }else{
                    reject(
                        {
                            status: 400,
                            message: "Usuário não encontrado"
                        }
                    )
                }

            }).catch(error =>{
                reject(error)
            })
        })
       
        
    }


    

}