import type { InputFormatter } from "../types";

// number formatter
export const numberFormatter: InputFormatter = (value: string) => {
  return value.replace(/[^\d]/g, "");
};
