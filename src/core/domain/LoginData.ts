export default class LoginData {
    private _nome: string;
    private _email: string;

    constructor(nome: string, email: string) {
        this._nome = nome;
        this._email = email;
    }

    get email(): string {
        return this._email;
    }

    get nome(): string {
        return this._nome;
    }
}