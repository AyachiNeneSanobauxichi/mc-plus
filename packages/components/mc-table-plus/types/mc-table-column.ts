import type { McTableAlign, McTableFixed } from "./mc-table";

export interface McTableColumnProps {
  prop: string;
  label: string;
  width?: number;
  fixed?: McTableFixed;
  sortable?: boolean;
  columnAlign?: McTableAlign;
}
