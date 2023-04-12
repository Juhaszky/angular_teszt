import { Component, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { ReadVarExpr } from '@angular/compiler';
import { highLowObject } from '../models/high_low_crypto';

@Component({
  selector: 'app-high-low-list',
  templateUrl: './high-low-list.component.html',
  styleUrls: ['./high-low-list.component.css']
})


export class HighLowListComponent {
  @Input() cryptosArr: string[] = [];
  @Input() receivedRates:highLowObject[] = [];
  deleteC = new EventEmitter<void>();
  constructor(public webSocket:WebSocketService) {
  }
  count: number = 0;
 
  
  ngOnInit() {
    this.runWebSocket();
  }
  ngAfterViewInit() {
    this.startCounter();
  }

  ngOnDestroy() {
    this.webSocket.close();
  }

  runWebSocket() {
    const asset_ids: string[] = [];
    this.cryptosArr.map((crypto)=> asset_ids.push(crypto+"/USD"));
    this.webSocket.connect();
    this.webSocket.sendMessage(asset_ids);
    
  }

  startCounter() {
    setInterval(() => {
      /*this.count++;
      this.receivedRates = this.webSocket.receivedData;
      if(this.count === 3) {
        this.receivedRates = [];
        this.receivedRates = this.webSocket.receivedData;
        console.log(this.receivedRates);
        this.receivedRates.find((c) => {
        })
        this.count = 0;
      }*/
      this.receivedRates = this.webSocket.getData();
      console.log(this.webSocket.getData());
    },1000)
  }
}
