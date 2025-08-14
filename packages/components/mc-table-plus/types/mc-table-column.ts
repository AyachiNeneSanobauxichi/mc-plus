import type { Slot } from "vue";
import type { McTableAlign, McTableFixed } from "./mc-table";

export interface McTableColumnProps {
  prop: string;
  label: string;
  desc?: string;
  width?: number | string;
  fixed?: McTableFixed;
  sortable?: boolean;
  columnAlign?: McTableAlign;
}

export interface McTableColumnSlots {
  default?: Slot;
  value?: Slot;
  "header-title"?: Slot;
  "header-desc"?: Slot;
  header?: Slot;
}
