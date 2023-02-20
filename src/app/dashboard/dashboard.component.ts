import { Component } from '@angular/core';
import { CryptoService } from '../services/crypto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private cryptoService: CryptoService) {}
  cryptos = [];

  ngOnInit() {
    this.cryptos = this.cryptoService.getCryptos();
  }
}
