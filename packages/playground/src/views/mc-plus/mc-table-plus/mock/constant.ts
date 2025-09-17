import type { OpenOrderTableRow, PositionTableRow } from "./types";

const POSITION_DATA: PositionTableRow[] = [
  {
    tokenName: "xAAPL",
    tokenDesc: "Apple Inc",
    position: "10000",
    unrealizedPnl: "353.43",
    realizedPnl: "353.43",
    todayPnl: "353.43",
    isPositive: true,
    changeRate: "0.25%",
    price: "121.14",
    quantity: "12421",
    availableQuantity: "125252.21",
  },
  {
    tokenName: "xTSLA",
    tokenDesc: "Tesla Inc",
    position: "10000",
    unrealizedPnl: "1353.34",
    realizedPnl: "1353.34",
    isPositive: false,
    changeRate: "2.12%",
    todayPnl: "1353.34",
    price: "121.14",
    quantity: "12421",
    availableQuantity: "125252.21",
  },
  {
    tokenName: "xINTC",
    tokenDesc: "Intel Corporation",
    position: "10000",
    unrealizedPnl: "353.43",
    realizedPnl: "353.43",
    isPositive: true,
    changeRate: "0.25%",
    todayPnl: "353.43",
    price: "121.14",
    quantity: "12421",
    availableQuantity: "125252.21",
  },
  {
    tokenName: "xLCID",
    tokenDesc: "Lucid Group, Inc.",
    position: "10000",
    unrealizedPnl: "353.43",
    realizedPnl: "353.43",
    isPositive: true,
    changeRate: "0.25%",
    todayPnl: "353.43",
    price: "121.14",
    quantity: "12421",
    availableQuantity: "125252.21",
  },
];

const OPEN_ORDER_DATA: OpenOrderTableRow[] = [
  {
    tokenName: "xAAPL",
    tokenDesc: "Apple Inc",
    type: "Mint",
    avgPrice: "--",
    orderPrice: "108.64",
    fillQty: "--",
    orderQty: "400",
    status: "Pending",
    lastUpdate: "02 Jun 2025 11:11:11",
  },
  {
    tokenName: "xAAPL",
    tokenDesc: "Apple Inc",
    type: "Mint",
    avgPrice: "--",
    orderPrice: "108.64",
    fillQty: "--",
    orderQty: "400",
    status: "Pending",
    lastUpdate: "02 Jun 2025 11:11:11",
  },
  {
    tokenName: "xAAPL",
    tokenDesc: "Apple Inc",
    type: "Mint",
    avgPrice: "108.64",
    orderPrice: "108.64",
    fillQty: "700",
    orderQty: "800",
    status: "Partially Completed",
    lastUpdate: "02 Jun 2025 11:11:11",
  },
];

const CDN_URL =
  "https://d1850j7ztm58xd.cloudfront.net/trader-site-v3-static/currency";

export { CDN_URL, POSITION_DATA, OPEN_ORDER_DATA };
