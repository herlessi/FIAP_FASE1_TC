import AUser from "./Abstracts/AUser";
import UserType from "./Enums/EnumUserTypes";


export default class UserCostumer extends AUser{
    

    private readonly userType = UserType.Costumer

    constructor(
        private _id:number,
        private _name:string,
        private _email:string,
        private _cpf:string,
        private _state:number,
        private _created_at:Date,
        private _updated_at:Date,
        private _deleted_at:Date
    ){
        super()
    }

    




}