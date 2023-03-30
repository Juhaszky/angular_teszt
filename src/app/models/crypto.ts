export class Crypto {
    asset_id: string;
    name: string;
    type_is_crypto: number;
    data_quote_start: Date;
    data_quote_end: Date;
    data_orderbook_start: Date;
    data_orderbook_end: Date;
    data_trade_start: Date;
    data_trade_end: Date;
    data_symbols_count: number;
    volume_1hrs_usd: number;
    volume_1day_usd: number;
    volume_1mth_usd: number;
    id_icon: string;
    data_start: Date;
    data_end: Date;

    
  constructor(
    asset_id: string,
    name: string,
    type_is_crypto: number,
    data_quote_start: Date,
    data_quote_end: Date, 
    data_orderbook_start: Date, 
    data_orderbook_end: Date, 
    data_trade_start: Date, 
    data_trade_end: Date, 
    data_symbols_count: number, 
    volume_1hrs_usd: number, 
    volume_1day_usd: number, 
    volume_1mth_usd: number, 
    id_icon: string, 
    data_start: Date, 
    data_end: Date
) {
    this.asset_id = asset_id;
    this.name = name;
    this.type_is_crypto = type_is_crypto;
    this.data_quote_start = data_quote_start;
    this.data_quote_end = data_quote_end;
    this.data_orderbook_start = data_orderbook_start;
    this.data_orderbook_end = data_orderbook_end;
    this.data_trade_start = data_trade_start;
    this.data_trade_end = data_trade_end;
    this.data_symbols_count = data_symbols_count;
    this.volume_1hrs_usd = volume_1hrs_usd;
    this.volume_1day_usd = volume_1day_usd;
    this.volume_1mth_usd = volume_1mth_usd;
    this.id_icon = id_icon;
    this.data_start = data_start;
    this.data_end = data_end;
  }}