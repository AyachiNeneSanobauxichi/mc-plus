export interface IDepositListRequest {
  pageNum: number;
  pageSize: number;
  statusList?: string[];
  updateTime?: boolean;
}

export interface DepositSummary {
  paymentCode: string;
  clientName: string;
  updateAt: string;
  payerAccountType: 1 | 2;
  paymentType: 10 | 11 | 12;
  currency: string;
  receiveAmount: number;
  status: number;
}

export interface IDepositListResponse {
  list: DepositSummary[];
  pageNum: number;
  pageSize: number;
  total: number;
}
