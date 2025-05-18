export default interface IService<E, S> {

    execute(input: E):S;

}