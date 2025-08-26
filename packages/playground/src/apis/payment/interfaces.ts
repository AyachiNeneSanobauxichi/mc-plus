import type { IDepositListRequest, IDepositListResponse } from "./types";
import { http } from "../request";

const getDepositList = async (request: IDepositListRequest) => {
  return await http.post<IDepositListRequest, IDepositListResponse>(
    "/payment/payment/depositListByPage.do",
    request
  );
};

export { getDepositList };
