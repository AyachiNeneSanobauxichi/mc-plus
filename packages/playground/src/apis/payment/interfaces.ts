import type { IDepositListRequest, IDepositListResponse } from "./types";
import { http } from "../request";

const getDepositList = async (request: IDepositListRequest) => {
  return await http.post<IDepositListRequest, IDepositListResponse>(
    "/payment/payment/depositListByPage.do",
    {
      statusList: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "10",
        "11",
        "12",
        "13",
        "15",
        "16",
        "18",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
      ],
      ...request,
    }
  );
};

export { getDepositList };
