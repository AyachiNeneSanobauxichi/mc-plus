import { delay } from "@mc-plus/utils";
import {
  OPEN_ORDER_DATA,
  OPEN_ORDER_EXPAND_DATA,
  POSITION_DATA,
} from "./constant";

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

const getOpenOrderExpandList = async (tokenName: string) => {
  await delay(300);
  return {
    code: 200,
    tokenName,
    message: "success",
    data: OPEN_ORDER_EXPAND_DATA,
  };
};

export { getPositionList, getOpenOrderList, getOpenOrderExpandList };
