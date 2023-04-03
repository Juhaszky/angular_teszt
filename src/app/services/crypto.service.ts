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
    const user = this.users?.find(u => u.id === this.currentId);
    if (user && !user.cryptos.includes(selectedCrypto)) {
      user.cryptos.push(selectedCrypto);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
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
    return this.http.get(this.baseApiUrl + 'exchangerate', { headers: headers, params: params});
  }
  
  getUsdExchangeRate(inputCrypto: string) {
    /*let headers = new HttpHeaders().set('X-CoinAPI-Key', this.apiKey);
    return this.http.get(this.baseApiUrl + 'exchangerate/'+ "USD/" + inputCrypto, { headers: headers });*/
    return this.http.get('/assets/crypto_exchange_doge.json');
  }
  
}
