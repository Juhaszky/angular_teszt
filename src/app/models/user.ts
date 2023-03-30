export class User {
    email: string;
    password: string;
    cryptos: string[];
    id: number;

    constructor(email: string, password: string, cryptos: string[], id: number) {
        this.email = email;
        this.password = password;
        this.cryptos = cryptos;
        this.id = id;
    }
}