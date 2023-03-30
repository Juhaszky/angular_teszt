import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class CryptoService {
  baseApiUrl = "https://rest.coinapi.io/v1/";
  apiKey = "B0539084-6C7D-4CED-A6AC-B4B12464ADAE"
  constructor(private http: HttpClient, private storageService: LocalStorageService) { }
  //currentUser = localStorage.getItem('currentUser');
  users: User[] = this.storageService.getUsers();
  currentId = this.storageService.getLoggedInUserId(); // 0 azt jelenti, hogy nincs userId
  protected headers = new HttpHeaders();
  protected params = new HttpParams();

  getUserCryptos() {
    const user = this.users.find(u => u.id === this.storageService.getLoggedInUserId());
    return user ? user.cryptos : [];
  }

  setUserCrypto(selectedCrypto: string) {
    console.log(this.users);
    console.log(this.currentId);
    if(this.users && this.currentId !== 0) {
      const userIndex = this.users.findIndex((user:User) => user.id === this.currentId);
      const user = this.users.find((user:User) => user.id === this.currentId);
      console.log(user);
      console.log(selectedCrypto);
      console.log(user?.cryptos);
      if(user?.cryptos.find((userCrypto: string) => userCrypto === selectedCrypto) === undefined) {
        console.log("ide bemegyunk?")
        if(user) user.cryptos.push(selectedCrypto);
        console.log(user) 
        if(userIndex !== -1) {
          this.users.splice(userIndex, 1, {...this.users[userIndex], ...user});
        }
        console.log("Ezt rakja bele:");
        console.log(this.users);
        return localStorage.setItem('users', JSON.stringify(this.users));
        //return this.users;
      } 
    }
    return undefined;
    /*
    const user = this.users
    if(this.currentUser) {
      let tempCurrentUser = JSON.parse(this.currentUser);
        tempCurrentUser.cryptos.push(selectedCrypto);
        return localStorage.setItem('currentUser', JSON.stringify(tempCurrentUser));
    }*/
  }

  getApiCryptos() {
    /*this.headers
    .set('Accept', 'application/json')
    .set('X-CoinAPI-Key', apiKey);
    this.params
    .append('filter_asset_id','BTC;ETH;DOGE;EUR;TRC;BLC')*/
    //return this.http.get(this.baseApiUrl + "assets/", { headers: headers, params: params});
    return this.http.get('/assets/crypto_response.json');
  }

  getExchangeRatesPeriodly(requestCrypto: string) {
    let headers = new HttpHeaders().set('X-CoinAPI-Key', this.apiKey);
    let params = new HttpParams().append('history', 'period_id=7DAY');
    return this.http.get(this.baseApiUrl + '/exchangerate', { headers: headers, params: params});
  }
}
