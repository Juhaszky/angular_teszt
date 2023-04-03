import { Component, Input, SimpleChanges } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import { Crypto } from '../models/crypto';
import { CryptoExchange } from '../models/cryptoExchange';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent {
  constructor(private cryptoService: CryptoService) {}

  @Input() cryptoData: Crypto | undefined;
  cryptoInfo: CryptoExchange | undefined;
  dollarToCryptoRate: number = 0;
  cryptoToDollarRate: number = 0;
  cryptoAmount: number = 0;
  dollarAmount: number = 0;
  exchangeForm = new FormGroup( { inputFieldUSD: new FormControl(), inputFieldCrypto: new FormControl() });

  ngOnInit() {  
    if(this.cryptoData) {
      this.cryptoService.getUsdExchangeRate(this.cryptoData.asset_id).subscribe((x: any) => {
        this.cryptoInfo = x;
        if(this.cryptoInfo) {
          this.dollarToCryptoRate = this.cryptoInfo.rate;
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }

  convertUsdToCrypto() {
    this.dollarToCryptoRate = this.dollarToCryptoRate || 1;
    this.cryptoAmount = this.dollarAmount * this.dollarToCryptoRate;
  }
  convertCryptoToUsd() {
    this.cryptoToDollarRate = 1 / this.dollarToCryptoRate;
    this.dollarAmount = this.cryptoAmount * this.cryptoToDollarRate;
  }
}
