import type { Ref, Slot } from "vue";
import type { McTableColumnProps } from "./mc-table-column";

export type McTableAlign = "left" | "center" | "right";

export type McTableSort = "asc" | "desc" | "normal";

export type McTableFixed = "left" | "right" | "none";

export type McTableSideType = "front" | "back";

export interface McTableColumn extends McTableColumnProps {
  headerTitle?: Slot;
  headerDesc?: Slot;
  header?: Slot;
  tableValue?: Slot;
  tableValueContent?: Slot;
  expand?: Slot;
  isExpand?: boolean;
}

export interface McTableProps {
  data: any[];
  loading?: boolean;
  sortType?: McTableSideType;
  pagination?: McTablePaginationType;
  width?: number | string;
  height?: number | string;
}

export interface McTableContext {
  columns: Ref<McTableColumn[]>;
  data: Ref<any[]>;
  rowState: Ref<McTableRowState[]>;
  isLoading: Ref<boolean>;
  pagination: McTablePaginationType;
  handleSort: (prop: string, sort: McTableSort) => void;
  handlePagination: (pagination: Partial<McTablePaginationType>) => void;
  setRowStateByIndex: (
    index: number,
    payload: Partial<McTableRowState>
  ) => void;
}

export interface McTableEmits {
  (e: "change:sort", prop: string, sort: McTableSort): void;
  (e: "change:pagination", pagination: McTablePaginationType): void;
}

export interface McTablePaginationType {
  pageNum: number;
  pageSize: number;
  total: number;
  pageSizes?: number[];
}

export interface McTableRowState {
  isExpand: boolean;
}
