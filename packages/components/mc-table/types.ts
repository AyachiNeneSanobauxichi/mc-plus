/*
 * @Author: Tieju yang
 * @Date: 2025-05-26 09:36:30
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-26 16:13:14
 */
import type { Ref } from "vue";

export type SortOrder = "asc" | "desc" | null;

export interface TableColumn {
  prop: string;
  label: string;
  width?: number | string;
  fixed?: boolean | "left" | "right";
  formatter?: (row: Record<string, unknown>, column: TableColumn, cellValue: any, index: number) => any;
  align?: "left" | "center" | "right";
  headerAlign?: "left" | "center" | "right";
  className?: string;
  headerClassName?: string;
  // 新增字段，支持自定义列渲染
  slot?: string;
  // 新增合并列的配置
  colSpan?: number | ((row: Record<string, unknown>, column: TableColumn, index: number) => number);
  // 新增合并行的配置
  rowSpan?: number | ((row: Record<string, unknown>, column: TableColumn, index: number) => number);
  // 排序相关
  sortable?: boolean;
  sortOrder?: SortOrder;
  sortMethod?: (a: any, b: any) => number;
}

export interface SortConfig {
  prop: string;
  order: SortOrder;
}

export interface PaginationConfig {
  currentPage?: number;
  pageSize?: number;
  total: number;
  pageSizes?: number[];
  layout?: string;
  background?: boolean;
}

export interface LoadingConfig {
  text?: string;
  spinner?: string;
  background?: string;
  customClass?: string;
}

export interface TableProps {
  // 数据
  data: Record<string, unknown>[];
  // 列配置
  columns: TableColumn[];
  // 是否显示边框
  border?: boolean;
  // 是否斑马线
  stripe?: boolean;
  // 是否显示表头
  showHeader?: boolean;
  // 行键
  rowKey?: string;
  // 空数据文本
  emptyText?: string;
  // 高度
  height?: string | number;
  // 最大高度
  maxHeight?: string | number;
  // 分页配置
  pagination?: PaginationConfig;
  // 合并单元格配置函数
  spanMethod?: (data: { row: Record<string, unknown>; column: TableColumn; rowIndex: number; columnIndex: number }) => { rowspan?: number; colspan?: number } | [number, number];
  // loading 状态
  loading?: boolean;
  // loading 文本
  loadingText?: string;
  // loading 配置
  loadingConfig?: LoadingConfig;
  // Method for Initializing Table Data
  initData?: ({ pageSize, pageNum }: { pageSize: number; pageNum: number }) => Promise<{ data: Record<string, unknown>[]; total: number }>;
  // 排序配置
  defaultSort?: SortConfig;
  // 选中行的键值
  selectedRowKeys?: (string | number)[];
  // 是否高亮当前行
  highlightCurrentRow?: boolean;
}

export interface TableEmits {
  // 行点击事件
  (e: "row-click", row: Record<string, unknown>, index: number): void;
  // 表头点击事件
  (e: "header-click", column: TableColumn, event: Event): void;
  // 分页改变事件
  (e: "page-change", payload: { pageSize: number; pageNum: number }): void;
  // 分页大小改变事件
  (e: "page-size-change", pageSize: number): void;
  // 排序改变事件
  (e: "sort-change", sortConfig: SortConfig): void;
  // 选中行改变事件
  (e: "selection-change", selectedRowKeys: (string | number)[]): void;
  // 当前行改变事件
  (e: "current-change", currentRow: Record<string, unknown> | null): void;
}

// 统一单元格插槽的参数类型
export interface CellSlotProps {
  row: Record<string, unknown>;
  column: TableColumn;
  $index: number;
  value: any;
  prop: string;
}

// 表头插槽的参数类型
export interface HeaderSlotProps {
  column: TableColumn;
  index: number;
}

export interface TableInstance {
  ref: Ref<HTMLElement | void>;
}
