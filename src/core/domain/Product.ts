export default class Product {

    constructor(
        private _id:number,
        private _category_id:number,
        private _name:string,
        private _price:number,
        private dt_created:Date,
        private fl_status:boolean
    ){
        this._id = _id;
        this._category_id = _category_id;
        this._name = _name;
        this._price = _price;
        this.dt_created = dt_created;
        this.fl_status = fl_status;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get category_id(): number {
        return this._category_id;
    }

    set category_id(value: number) {
        this._category_id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get dtCreated(): Date {
        return this.dt_created;
    }

    set dtCreated(value: Date) {
        this.dt_created = value;
    }

    get flStatus(): boolean {
        return this.fl_status;
    }

    set flStatus(value: boolean) {
        this.fl_status = value;
    }

}