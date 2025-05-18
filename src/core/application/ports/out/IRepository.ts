import AUser from "../../../domain/Abstracts/AUser";

export default interface IRepository{
    save(user:AUser):boolean;
}