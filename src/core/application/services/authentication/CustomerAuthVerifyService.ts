import IService from "../../ports/in/InServices";
import jwt from 'jsonwebtoken';
import IRepository from "../../ports/out/IRepository";
import Authentication from "../../../domain/authentication/Authentication";

export default class CostumerAuthVerifyService implements IService<string,Object>{

    repo: IRepository;
    private JWT_SECRET:string = process.env.JWT_SECRET

    constructor(repo:IRepository){
        this.repo = repo
    }
       
    async execute(token:string): Object {

        const auth = new Authentication()
        return await auth.authorizate(token)

    }


    

}