import type { McTableAlign, McTableSort } from "./mc-table";

export interface McTableHeaderCellProps {
  prop: string;
  columnAlign?: McTableAlign;
  title?: string;
  desc?: string;
  help?: string;
  sort?: McTableSort;
}
