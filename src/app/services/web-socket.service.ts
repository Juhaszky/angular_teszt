import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

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
  public receivedData: MessageData[] = [];

  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket('wss://ws-sandbox.coinapi.io/v1/');
      console.log("done");
      this.socket$.subscribe((data: MessageData) => {
        this.receivedData.push(data);
      });
    }
  }

  sendMessage(message: object) {
    this.socket$.next(message);
  }

  close() {
    this.socket$.complete();
  }
}
