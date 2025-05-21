import IRepository from "../../../../core/application/ports/out/IRepository";
import AUser from "../../../../core/domain/shared/Abstracts/AUser";

export default class CustomerRepositoryPG implements IRepository{
    
    private userList:Array<AUser> = []

    save(user:AUser): boolean {
        if(this.userList.push(user)){
            return true
        }else{
            return false
        }
    }

}