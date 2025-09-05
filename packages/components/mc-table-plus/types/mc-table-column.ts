import type { Slot } from "vue";
import type { McTableAlign, McTableFixed, McTableSort } from "./mc-table";

export interface McTableColumnProps {
  prop: string;
  label?: string;
  desc?: string;
  width?: number | string;
  fixed?: McTableFixed;
  sortable?: boolean;
  sort?: McTableSort;
  columnAlign?: McTableAlign;
  defaultValue?: string | number | boolean;
}

export interface McTableColumnSlots {
  default?: Slot;
  value?: Slot;
  "header-title"?: Slot;
  "header-desc"?: Slot;
  header?: Slot;
  expand?: Slot;
}
