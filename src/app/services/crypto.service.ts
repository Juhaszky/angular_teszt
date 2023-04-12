import { HttpClient, HttpHeaders, HttpInterceptor, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';
import { CRYPTOS_URL, EXCHANGE_URL } from '../shared/urls';
import { end } from '@popperjs/core';

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
    } else {
      alert("A kiválasztott kriptovaluta már hozzá van adva a fiókodhoz!");
    }
  }

  removeUserCrypto(selectedCrypto: string) {
    const idx = this.user?.cryptos.findIndex((crypto) => crypto === selectedCrypto);
    if(idx !== undefined) {
      if(idx > -1) this.user?.cryptos.splice(idx,1);
    }
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getApiCryptos() {
    //return this.http.get(CRYPTOS_URL + "filter_asset_id','BTC;ETH;DOGE;EUR;TRC;BLC");
    return this.http.get('/assets/crypto_response.json');
  }

  getExchangeRatesPeriodly(requestCrypto: string, startDate: string, endDate: string) {
    /*let params = new HttpParams()
    .append('period_id', '8HRS')
    .append('time_start', startDate)
    .append('time_end', endDate);*/
    //return this.http.get(EXCHANGE_URL + requestCrypto +'/USD' +'/history', { params: params });
    return this.http.get('/assets/crypto_chart.json');
  }
  
  getUsdExchangeRate(inputCrypto: string) {
    //return this.http.get(EXCHANGE_URL + "USD/" + inputCrypto);
    return this.http.get('/assets/crypto_exchange_doge.json');
  }
  
}