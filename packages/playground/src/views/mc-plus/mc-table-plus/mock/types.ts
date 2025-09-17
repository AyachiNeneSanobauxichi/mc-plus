export interface PositionTableRow {
  tokenName: string;
  tokenDesc: string;
  position: string;
  unrealizedPnl: string;
  realizedPnl: string;
  todayPnl: string;
  isPositive: boolean;
  changeRate: string;
  price: string;
  quantity: string;
  availableQuantity: string;
}

export interface OpenOrderTableRow {
  tokenName: string;
  tokenDesc: string;
  type: string;
  avgPrice: string;
  orderPrice: string;
  fillQty: string;
  orderQty: string;
  status: string;
  lastUpdate: string;
}
