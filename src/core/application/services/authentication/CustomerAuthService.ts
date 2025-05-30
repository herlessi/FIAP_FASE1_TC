import IService from "../../ports/in/InServices";
import IRepository from "../../ports/out/IRepository";
import Authentication from "../../../domain/authentication/Authentication";

export default class CostumerAuthService implements IService<Object,Object>{

    repo: IRepository;
    private JWT_SECRET:string = process.env.JWT_SECRET

    constructor(repo:IRepository){
        this.repo = repo
    }
       
    async execute(data:Object): Object {

        
        let datareturned = null
        let logwithdata = false
        if(data.cpf){
            logwithdata = true
            datareturned = await this.repo.list({cpf:data.cpf})
        }else{
            if(data.email && !data.name){
                logwithdata = true
                datareturned = await this.repo.list({email:data.email, name:data.name})
            }
        }
       
        const auth = new Authentication(this.repo)
        let retorno = null
        if(logwithdata == true){
            if(datareturned?.length > 0){
                retorno = await auth.authenticate(datareturned[0])
            }else{
                return {
                    status: 400,
                    message: "Usuário não encontrado"
                }
            }
        }else{
            let newuser = await auth.createAnonymousUser(data.anonymousid)
            if(newuser?.length > 0){
                retorno = await auth.authenticate(newuser[0])
            }else{
                return {
                    status: 400,
                    message: "Usuário não encontrado"
                }
            }
        }

        return retorno 

        
        
    }


    

}