import AUser from "../../../domain/shared/Abstracts/AUser";

export default interface IAdminRepositoryPg{
    checkLogin(user:Object):Promise<Array<Object>>;
}