import type { IResponse } from "../types";
import { delay } from "@mc-plus/utils";

// fetch mock data
const fetchMockData = async (): Promise<IResponse<string>> => {
  console.log("Fetch Mock Data");
  await delay(1000);

  const rand = Math.random();
  if (rand < 0.25) {
    return {
      code: 200,
      message: "success",
      success: true,
      data: "mock data",
    };
  } else {
    return {
      code: 300,
      message: "unknown",
      success: false,
      data: "mock data",
    };
  }
};

export { fetchMockData };
