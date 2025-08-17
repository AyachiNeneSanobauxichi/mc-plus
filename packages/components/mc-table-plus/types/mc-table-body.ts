import type { McTableColumn } from "./mc-table";

export interface McTablePlusBodyProps {
  columns: McTableColumn[];
  data: any[];
  loading?: boolean;
}
