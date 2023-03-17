import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CryptoService {
  baseApiUrl = "https://rest.coinapi.io/v1/assets/";
  apiKey = "B0539084-6C7D-4CED-A6AC-B4B12464ADAE"
  constructor(private http: HttpClient) { }
  currentUser = localStorage.getItem('currentUser');
  getUserCryptos() {
    let cryptos = [];
    if(this.currentUser != null) {
      cryptos = JSON.parse(this.currentUser).cryptos;
      return cryptos;
    }
    return [];
  }
  setUserCrypto(selectedCrypto: string) {
    if(this.currentUser) {
      let temp = JSON.parse(this.currentUser);
      temp.cryptos.push(selectedCrypto);
      localStorage.setItem('currentUser', JSON.stringify(temp));
    }
  }

  getApiCryptos() {
    /*let header = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('X-CoinAPI-Key', 'B0539084-6C7D-4CED-A6AC-B4B12464ADAE');
    let params = new HttpParams()
    .append('filter_asset_id','BTC;ETH;DOGE;EUR;TRC;BLC')*/
    
    //return this.http.get(this.baseApiUrl, { headers: header, params: params});
    return this.http.get('/assets/crypto_response.json');
  }


}
