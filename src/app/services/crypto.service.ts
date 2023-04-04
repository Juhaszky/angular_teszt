import { HttpClient, HttpHeaders, HttpInterceptor, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';
import { CRYPTOS_URL, EXCHANGE_URL } from '../shared/urls';

@Injectable({
  providedIn: 'root'
})

export class CryptoService {
  constructor(private http: HttpClient, private storageService: LocalStorageService) { }
  users: User[] = this.storageService.getUsers();
  currentId = this.storageService.getLoggedInUserId(); // 0 azt jelenti, hogy nincs userId
  protected params = new HttpParams();
  user = this.users.find(u => u.id === this.storageService.getLoggedInUserId());
  getUserCryptos() {
    return this.user ? this.user.cryptos : [];
  }

  setUserCrypto(selectedCrypto: string) {
    if (this.user && !this.user.cryptos.includes(selectedCrypto)) {
      this.user.cryptos.push(selectedCrypto);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  removeUserCrypto(selectedCrypto: string) {
    const idx = this.user?.cryptos.findIndex((crypto) => crypto === selectedCrypto);
    if(idx) this.user?.cryptos.splice(idx,1);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getApiCryptos() {
    return this.http.get(CRYPTOS_URL + "filter_asset_id','BTC;ETH;DOGE;EUR;TRC;BLC");
    //return this.http.get('/assets/crypto_response.json');
  }

  getExchangeRatesPeriodly(requestCrypto: string) {
    //let headers = new HttpHeaders().set('X-CoinAPI-Key', this.apiKey);
    let params = new HttpParams().append('history', 'period_id=7DAY');
    //return this.http.get(BASE_URL + 'exchangerate', { headers: headers, params: params});
  }
  
  getUsdExchangeRate(inputCrypto: string) {
    //let headers = new HttpHeaders().set('X-CoinAPI-Key', this.apiKey);
    return this.http.get(EXCHANGE_URL + inputCrypto);
    //return this.http.get('/assets/crypto_exchange_doge.json');
  }
  
}
