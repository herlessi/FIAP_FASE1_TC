export default abstract class AUser{

    public itsme():void{
        console.log("It's me ",this)
    }

    public abstract save():number;
}