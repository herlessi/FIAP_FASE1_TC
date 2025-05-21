import AUser from "../../../domain/shared/Abstracts/AUser";

export default interface IRepository{
    save(user:AUser):boolean;
}