import { Component, Output } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import { MatDialog } from '@angular/material/dialog'
import { NewCryptoComponent } from '../new-crypto/new-crypto.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private cryptoService: CryptoService, private dialog: MatDialog) {}
  @Output() cryptos = [];

  ngOnInit() {
    this.cryptos = this.cryptoService.getUserCryptos();
  }

  ngOnChanges() {
    this.cryptos = this.cryptoService.getUserCryptos();
  }

  openDialog() {
    this.dialog.open(NewCryptoComponent, {
      height: '25%',
      width: '25%' 
    });
  }
}
