export class User {
    email: string;
    password: string;
    cryptos: string[];
    isLogged: boolean;

    constructor(email: string, password: string, cryptos: string[]) {
        this.email = email;
        this.password = password;
        this.cryptos = cryptos;
        this.isLogged = false;
    }
}