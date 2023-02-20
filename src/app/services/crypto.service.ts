import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  getCryptos() {
    let cryptos = [];
    let currentUser = localStorage.getItem('currentUser');
    if(currentUser != null) {
      cryptos = JSON.parse(currentUser).cryptos;
      return cryptos;
    }
    return [];
  }
}
