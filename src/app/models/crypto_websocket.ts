export class CryptoWebS {
    period_id: string;
    time_period_start: string;
    time_period_end: string;
    time_open: string;
    time_close: string;
    price_open: number;
    price_high: number;
    price_low: number;
    price_close: number;
    volume_traded: number;
    trades_count: number;
    symbol_id: string;
    sequence: number;
    type: string;
    constructor(period_id: string, time_period_start: string, time_period_end: string, time_open: string, time_close: string, price_open: number, price_high: number, price_low: number, price_close: number, volume_traded: number, trades_count: number, symbol_id: string, sequence: number, type: string) {
        this.period_id = period_id;
        this.time_period_start = time_period_start;
        this.time_period_end = time_period_end;
        this.time_open = time_open;
        this.time_close = time_close;
        this.price_open = price_open;
        this.price_high = price_high;
        this.price_low = price_low;
        this.price_close = price_close;
        this.volume_traded = volume_traded;
        this.trades_count = trades_count;
        this.symbol_id = symbol_id;
        this.sequence = sequence;
        this.type = type;
    }
}