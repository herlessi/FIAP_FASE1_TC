import AUser from "../../../domain/shared/Abstracts/AUser";

export default interface IRepository{
    save(user:AUser):Promise<Array<Object>>;
    list(user:Object):Promise<Array<Object>>;
    update(user:Object):Promise<Array<Object>>;
    delete(user:Object):Promise<Array<Object>>;
}