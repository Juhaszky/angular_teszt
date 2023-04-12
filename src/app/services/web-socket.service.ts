import { EventEmitter, Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { CryptoWebS } from '../models/crypto_websocket';
import { highLowObject } from '../models/high_low_crypto';

interface MessageData {
  message: string;
  time?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() { }

  private socket$!: WebSocketSubject<any>;
   receivedData:highLowObject[] = [];
   data: string[] = [];
   deleteC = new EventEmitter();


  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket('wss://ws-sandbox.coinapi.io/v1/');
      this.socket$.subscribe((data: CryptoWebS) => {

        const symbol = data.symbol_id.split("_")[2];
        const existingIndex = this.receivedData.findIndex(d => d.symbol === symbol);
        
        if (existingIndex >= 0) {
          this.deleteC.subscribe((x) => {
            if(x !== undefined) {
              this.receivedData.splice(existingIndex,1);
            }
          });
          this.receivedData[existingIndex] = {
            "symbol": symbol,
            "high": data.price_high,
            "low": data.price_low
          };
        } else {
          this.receivedData.push({
            "symbol": symbol,
            "high": data.price_high,
            "low": data.price_low
          });
        }
      });
    }
  }

  getData() {
    return this.receivedData;
  }
  

  sendMessage(cryptos: string[]) {
    const messageObj = {
      "type": "hello",
      "apikey": "B0539084-6C7D-4CED-A6AC-B4B12464ADAE",
      "heartbeat": false,
      "subscribe_data_type": ["ohlcv"],
      "subscribe_update_limit_ms_exrate": 100000,
      "subscribe_filter_asset_id": cryptos,
      "subscribe_filter_period_id": ["1MIN"],
      "subscribe_filter_symbol_id": ["COINBASE"]
    };
    this.socket$.next(messageObj);
  }

  close() {
    this.socket$.complete();
  }
}
