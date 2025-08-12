import type { McTableAlign, McTableSort } from "./mc-table";

export interface McTableHeaderCellProps {
  columnAlign?: McTableAlign;
  title?: string;
  desc?: string;
  help?: string;
  sort?: McTableSort;
}

export interface McTableHeaderCellEmits {
  (e: "update:sort", sort: McTableSort): void;
}
