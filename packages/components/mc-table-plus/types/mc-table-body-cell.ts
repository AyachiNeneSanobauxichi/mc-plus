import type { McTableAlign } from "./mc-table";

export type McTablePlusBodyCellType = "expand" | "normal";

export interface McTablePlusBodyCellProps {
  value?: string | number | boolean | null | undefined;
  default?: string | number | boolean | null | undefined;
  columnAlign?: McTableAlign;
  type?: McTablePlusBodyCellType;
  rowIndex: number;
}
