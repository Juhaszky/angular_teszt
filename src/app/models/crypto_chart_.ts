export class cryptoChart {
    rate_close: number;
    rate_high: number;
    rate_low: number;
    rate_open: number;
    time_close: string;
    time_open: string;
    time_period_end: string;
    time_period_start: string;
    constructor(
        rate_close: number, 
        rate_high: number, 
        rate_low: number, 
        rate_open: number, 
        time_close: string, 
        time_open: string, 
        time_period_end: string, 
        time_period_start: string
    ) {
        this.rate_close = rate_close
        this.rate_high = rate_high
        this.rate_low = rate_low
        this.rate_open = rate_open
        this.time_close = time_close
        this.time_open = time_open
        this.time_period_end = time_period_end
        this.time_period_start = time_period_start
      }
}