import AUser from "../../../domain/shared/Abstracts/AUser";

export default interface IAdminRepository{
    checkLogin(user:Object):Promise<Array<Object>>;
}