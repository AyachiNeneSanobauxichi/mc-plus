import type { McTableAlign } from "../types";

// get flex align
const getFlexAlign = (align: McTableAlign) => {
  switch (align) {
    case "left":
      return "flex-start";
    case "center":
      return "center";
    case "right":
      return "flex-end";
  }
};

export default getFlexAlign;
