import type { McTableAlign, McTableSort } from "./mc-table";

export interface McTableHeaderCellProps {
  width?: number | string;
  columnAlign?: McTableAlign;
  title?: string;
  desc?: string;
  help?: string;
  sort?: McTableSort;
}
