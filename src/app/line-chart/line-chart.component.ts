import { Component, Input, SimpleChanges } from '@angular/core';
import { Crypto } from '../models/crypto';
import { CryptoService } from '../services/crypto.service';
import { cryptoChart } from '../models/crypto_chart_';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  constructor(private cryptoService: CryptoService) {}
  @Input() cryptoInfo: Crypto | undefined;
  value = "";
  view: number[] = [200, 200];
  resultData:object[] =  [];
  result:cryptoChart[] = [];
  timeline: boolean = true;

  ngOnInit() {
    if(this.cryptoInfo) {
      this.cryptoService.getExchangeRatesPeriodly(this.cryptoInfo?.asset_id, this.getLastWeek(), this.getSysdate()).subscribe((data) => {
        let series: object[] = [];
        Object.values(data).map((chartData:cryptoChart)=> {
            series.push({name: chartData.time_period_start.split("T")[0], value: chartData.rate_high})
        });
        let tmpArr = [{ name: this.cryptoInfo?.name, series: series}];
        this.resultData = [...tmpArr];
          });
    }
  }
  ngOnChanges() {
    this.ngOnInit();
  }

  getSysdate() {
    const dateNow = new Date();
    return dateNow.toISOString();
  }

  getLastWeek() {
    const date = new Date();
    const lastweek = new Date(date.getFullYear(), date.getMonth(), date.getDate() -6);
    return lastweek.toISOString();
  }
  
}