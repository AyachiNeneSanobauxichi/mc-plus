import { delay } from "@mc-plus/utils";
import { OPEN_ORDER_DATA, POSITION_DATA } from "./constant";

const getPositionList = async () => {
  await delay(300);
  return {
    code: 200,
    message: "success",
    data: POSITION_DATA,
  };
};

const getOpenOrderList = async () => {
  await delay(300);
  return {
    code: 200,
    message: "success",
    data: OPEN_ORDER_DATA,
  };
};

export { getPositionList, getOpenOrderList };
