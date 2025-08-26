import type { Ref, VNode } from "vue";
import type { McTableColumnProps } from "./mc-table-column";

export type McTableAlign = "left" | "center" | "right";

export type McTableSort = "asc" | "desc" | "normal";

export type McTableFixed = "left" | "right" | "none";

export type McTableSideType = "front" | "back";

export interface McTableColumn extends McTableColumnProps {
  headerTitle?: VNode;
  headerDesc?: VNode;
  header?: VNode;
  tableValue?: VNode;
  tableValueContent?: VNode;
}

export interface McTableProps {
  data: any[];
  loading?: boolean;
  sortType?: McTableSideType;
  pagination?: McTablePaginationType;
}

export interface McTableContext {
  isLoading: Ref<boolean>;
  pagination: McTablePaginationType;
  handleSort: (prop: string, sort: McTableSort) => void;
  handlePagination: (pagination: Partial<McTablePaginationType>) => void;
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
