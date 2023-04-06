import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  
  constructor(private cryptoService: CryptoService, private localStorage: LocalStorageService, @Inject(MAT_DIALOG_DATA) public data: string,
  private dialogRef: MatDialogRef<NewCryptoComponent>) {}

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

  saveSelectedCrypto() {
    if (this.selectedCrypto !== "") this.dialogRef.close({data: this.selectedCrypto});
  }
}
