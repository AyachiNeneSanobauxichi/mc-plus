import { delay } from "@mc-plus/utils";
import { POSITION_DATA } from "./constant";

const getPositionList = async () => {
  await delay(300);
  return {
    code: 200,
    message: "success",
    data: POSITION_DATA,
  };
};

export { getPositionList };
