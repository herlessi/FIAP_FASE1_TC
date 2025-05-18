import AUser from "./Abstracts/AUser";
import UserType from "./Enums/EnumUserTypes";


export default class UserAdmin extends AUser{
    

    private readonly userType = UserType.Costumer

    constructor(
        private _id:number,
        private _name:string,
        private _surname:string,
        private _birthdate:Date,
        private _email:string,
        private _state:number,
        private _password:string,
        private _created_at:Date,
        private _updated_at:Date,
        private _deleted_at:Date
    ){
        super()
    }


    public salvar(): number {
        throw new Error("Method not implemented.");
    }



    //Gets e Sets
    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get surname(): string {
        return this._surname;
    }

    public set surname(value: string) {
        this._surname = value;
    }

    public get birthdate(): Date {
        return this._birthdate;
    }

    public set birthdate(value: Date) {
        this._birthdate = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }

    public get state(): number {
        return this._state;
    }

    public set state(value: number) {
        this._state = value;
    }

    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        this._password = value;
    }

    public get created_at(): Date {
        return this._created_at;
    }

    public set created_at(value: Date) {
        this._created_at = value;
    }

    public get updated_at(): Date {
        return this._updated_at;
    }

    public set updated_at(value: Date) {
        this._updated_at = value;
    }

    public get deleted_at(): Date {
        return this._deleted_at;
    }

    public set deleted_at(value: Date) {
        this._deleted_at = value;
    }
}