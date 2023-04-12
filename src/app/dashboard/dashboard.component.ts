import { Component, EventEmitter, Input } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { NewCryptoComponent } from '../new-crypto/new-crypto.component';
import { Crypto } from '../models/crypto';
import { WebSocketService } from '../services/web-socket.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private cryptoService: CryptoService, private dialog: MatDialog, private webS: WebSocketService) {}
  @Input() cryptos: string[] = [];
  selectedIndex = 0;
  selectedCryptoDetails: Crypto | undefined;
  

  ngOnInit() {
    this.cryptos = this.cryptoService.getUserCryptos();
  }

  openDialog() {
    this.dialog.open(NewCryptoComponent, {
      height: '25%',
      width: '25%'
    }).afterClosed().subscribe(res => {
      if (res?.data) {
        this.cryptoService.setUserCrypto(res.data);
        if(this.cryptos) 
        {
          this.webS.sendMessage(this.cryptos.map((c)=> c+"/USD"));
          
        }
      }
    });
  }

  findCryptoByName() {
    const cryptos = this.cryptoService.getApiCryptos();
      cryptos.forEach((x) => {
        this.selectedCryptoDetails = Object.values(x).find((data:Crypto) => data.asset_id === this.cryptoService.getUserCryptos()[this.selectedIndex]);
      });
  }

  deleteCrypto() {
    this.cryptoService.removeUserCrypto(this.cryptos[this.selectedIndex]);
    this.webS.deleteC.emit(this.selectedCryptoDetails?.asset_id);
    this.selectedCryptoDetails = undefined;
    this.webS.sendMessage(this.cryptos.map((c)=> c + "/USD"));
  }

}
