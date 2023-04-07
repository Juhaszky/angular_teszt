import { Component, Input, SimpleChanges } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-high-low-list',
  templateUrl: './high-low-list.component.html',
  styleUrls: ['./high-low-list.component.css']
})
export class HighLowListComponent {
  @Input() cryptosArr: string[] = [];
  @Input() receivedRates = this.webSocket.receivedData;
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

  ngOnChanges() {
    console.log(this.receivedRates);
  }

  runWebSocket() {
    const message =  {
      "type": "hello",
      "apikey": "B0539084-6C7D-4CED-A6AC-B4B12464ADAE",
      "heartbeat": false,
      "subscribe_data_type": ["ohlcv"],
      "subscribe_update_limit_ms_exrate": 100000,
      "subscribe_filter_asset_id": ["ETH/USD"],
      "subscribe_filter_period_id": ["1MIN"]
    };
    this.webSocket.connect();
    this.webSocket.sendMessage(message);
    
  }

  startCounter() {
    setInterval(() => {
      this.count++;
      if(this.count === 3) {
        this.count = 0;
        this.receivedRates.push(this.webSocket.receivedData[this.webSocket.receivedData.length-1]);
        //this.receivedRates.map((data)=> console.log(data.))
      }
      this.receivedRates = [];
      
    },1000)
  }
}
