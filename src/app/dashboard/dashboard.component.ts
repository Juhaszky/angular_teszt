import { Component, Input, Output } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { NewCryptoComponent } from '../new-crypto/new-crypto.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private cryptoService: CryptoService, private dialog: MatDialog) {}
  @Input() cryptos: string[] = [];

  ngOnInit() {
    this.cryptos = this.cryptoService.getUserCryptos();
  }

  ngOnChanges() {
    this.cryptos = this.cryptoService.getUserCryptos();
  }

  openDialog() {
    let dialogRef =this.dialog.open(NewCryptoComponent, {
      height: '25%',
      width: '25%' 
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res !== undefined) {
        const selectedCrypto = res?.data || "";
        if (this.cryptos.find((crypto) => crypto === selectedCrypto) === undefined) {
          this.cryptos.push(selectedCrypto)
          this.cryptoService.setUserCrypto(selectedCrypto);
        } else {
          return alert("Selected crypto already exist!");
        }
      }
    })
  }

}
