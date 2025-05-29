export default interface IPaymentRepository{
    savePayment(data:Object):Promise<Array<Object>>;
}