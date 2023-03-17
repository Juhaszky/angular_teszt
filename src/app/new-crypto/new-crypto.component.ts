import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import { LocalStorageService } from '../services/local-storage.service';



@Component({
  selector: 'app-new-crypto',
  templateUrl: './new-crypto.component.html',
  styleUrls: ['./new-crypto.component.css']
})
export class NewCryptoComponent {
  cryptoList: any = [];
  selectedCrypto = "";
  
  constructor(private cryptoService: CryptoService, private localStorage: LocalStorageService) {}

  getCryptoList() {
    this.cryptoService.getApiCryptos().subscribe((data) => {
      Object.values(data).map((crypto) => {
        this.cryptoList.push(crypto);
      })
    });
  }

  ngOnInit() {
    this.getCryptoList();
  }
  ngOnChanges() {
    console.log('alma');
  }


  addCryptoToUser() {
    this.cryptoService.setUserCrypto(this.selectedCrypto);
  }
}
