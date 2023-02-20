export class User {
    email: string;
    password: string;
    cryptos: string[];

    constructor(email: string, password: string, cryptos: string[]) {
        this.email = email;
        this.password = password;
        this.cryptos = cryptos;
    }
}