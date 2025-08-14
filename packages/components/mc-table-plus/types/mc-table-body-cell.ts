import type { McTableAlign } from "./mc-table";

export interface McTablePlusBodyCellProps {
  value?: string | number | boolean | null | undefined;
  default?: string;
  columnAlign?: McTableAlign;
}
