import jwt from 'jsonwebtoken';
import CustomerSaveService from '../../application/services/authentication/CustomerSaveService';
import UserCostumer from '../UserCostumer';
import IRepository from '../../application/ports/out/IRepository';
export default class Authentication {

    private repo:IRepository

    constructor(repo:IRepository){
        this.repo = repo
    }

    private JWT_SECRET:string = process.env.JWT_SECRET

    public async authorizate(token:string): Object {
        

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

    public async createAnonymousUser(name:string):number{
        let user = new UserCostumer(null, name, null, null, 0, new Date(), new Date(), null, null)
        const customerservice = new CustomerSaveService(this.repo)
        let retorno = await customerservice.execute(user)
        console.log('retorno ',retorno)
        return retorno
    }

    public async authenticate(data:Object): Promise<Object> {

        return new Promise(async (resolve, reject) => {
            console.log('data ',data)
            const payload = data
            const expiresIn = '1h'
            let retorno = {
                        status: 500,
                        message: "Erro ao gerar token"
                    }
            jwt.sign(payload, this.JWT_SECRET, { expiresIn }, (err, token) => {
                if (err) {
                    retorno = {
                        status: 500,
                        message: "Erro ao gerar token"
                    }
                    reject(retorno)
                } else {
                    retorno = {
                        status: 200,
                        token: token
                    }
                    resolve(retorno)
                }
            })


        })
    }
}