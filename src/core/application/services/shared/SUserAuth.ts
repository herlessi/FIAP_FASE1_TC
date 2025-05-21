import AUser from "../../../domain/shared/Abstracts/AUser";
import IService from "../../ports/in/InServices";

export default class SUserAuth implements IService<any, any>{

    userCase: UC_User;

    constructor(userCase:UC_User){
        this.userCase = userCase
    }
       
    execute(
        id:number,
        name:string,
        surname:string,
        birthdate:Date,
        email:string,
        state:number,
        password:string,
        created_at:Date,
        updated_at:Date,
        deleted_at:Date
    ): AUser {

        this.userCase.save(id,
                            name,
                            surname,
                            birthdate,
                            email,
                            state,
                            password,
                            created_at,
                            updated_at,
                            deleted_at)
        return
        
    }


    saveNewUser(req:Request,res:Response):Object{
        return this.save(
            req.body.id,
            req.body.name,
            req.body.surname,
            req.body.birthdate,
            req.body.email,
            req.body.state,
            req.body.password,
            req.body.created_at,
            req.body.updated_at,
            req.body.deleted_at
        )
        
    }

    // // list(): Array<AUser> {
    // //     res.status(200).json({msg:'list'})
    // // }

    // update(): AUser {
    //     res.status(200).json({msg:'update'})
    // }

    // delete(): AUser {
    //     res.status(200).json({msg:'delete'})
    // }

    // save(req:Request,res:Response): AUser {
    //     res.status(200).json({msg:'ok'})
    //     // throw new Error("Method not implemented.");
    // }
    list(req:Request,res:Response): Array<AUser> {
        res.status(200).json({msg:'list'})
    }
    update(req:Request,res:Response): AUser {
        throw new Error("Method not implemented.");
    }
    delete(req:Request,res:Response): AUser {
        throw new Error("Method not implemented.");
    }

}