import AUser from "./shared/Abstracts/AUser";
import UserType from "./shared/Enums/EnumUserTypes";


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
        private _deleted_at:Date,
        private _token:string
    ){
        super()
    }

    
    public get id(): number {
        return this._id ?? null;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get name(): string {
        return this._name?? null;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get email(): string {
        return this._email?? null;
    }

    public set email(value: string) {
        this._email = value;
    }

    public get cpf(): string {
        return this._cpf?? null;
    }

    public set cpf(value: string) {
        this._cpf = value;
    }

    public get state(): number {
        return this._state?? null;
    }

    public set state(value: number) {
        this._state = value;
    }

    public get created_at(): Date {
        return this._created_at?? null;
    }

    public set created_at(value: Date) {
        this._created_at = value;
    }

    public get updated_at(): Date {
        return this._updated_at?? null;
    }

    public set updated_at(value: Date) {
        this._updated_at = value;
    }

    public get deleted_at(): Date {
        return this._deleted_at?? null;
    }

    public set deleted_at(value: Date) {
        this._deleted_at = value;
    }

    public get token(): string {
        return this._token?? null;
    }

    public set token(value: string) {
        this._token = value;
    }

    public get type(): UserType {
        return this.userType;
    }



}