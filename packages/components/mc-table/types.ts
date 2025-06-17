import type { Ref } from "vue";

/** 表格行数据类型 */
export type RowData = Record<string, unknown>;

/** 排序方向 */
export type SortDirection = "asc" | "desc";

/** 排序状态（包含未排序状态） */
export type SortOrder = SortDirection | null;

/** 对齐方式 */
export type AlignType = "left" | "center" | "right";

/** 列固定位置 */
export type ColumnFixed = boolean | "left" | "right";

export interface TableProps {
  // 核心数据
  data: RowData[];
  columns: TableColumn[];

  // 样式配置
  showHeader?: boolean;
  height?: string | number;
  maxHeight?: string | number;
  rowKey?: string;
  emptyText?: string;

  // 功能配置
  pagination?: PaginationConfig;
  loading?: boolean;
  loadingText?: string;
  loadingConfig?: LoadingConfig;
  highlightCurrentRow?: boolean;

  // 选择功能配置
  selectable?: boolean;
  selectedRows?: RowData[];
  selectOnRowClick?: boolean;

  // 方法类配置
  spanMethod?: (params: { row: RowData; column: TableColumn; rowIndex: number; columnIndex: number }) => { rowspan?: number; colspan?: number } | [number, number];

  initData?: (params: { pageSize: number; pageNum: number }) => Promise<{ data: RowData[]; total: number }>;

  // 状态管理
  defaultSort?: SortConfig;
}

/** 分页配置 */
export interface PaginationConfig {
  currentPage?: number;
  pageSize?: number;
  total: number;
  pageSizes?: number[];
  background?: boolean;
}

/** 加载状态配置 */
export interface LoadingConfig {
  text?: string;
  spinner?: string;
  background?: string;
  customClass?: string;
}

/** 排序配置 */
export interface SortConfig {
  prop: string;
  order: SortOrder;
}

export interface TableColumn {
  /** 列唯一标识 (对应 data 中的字段) */
  prop: string;
  /** 列标题 */
  label: string;
  /** 列宽度 (支持数字和带单位字符串) */
  width?: number | string;
  /** 固定列位置 */
  fixed?: ColumnFixed;
  /** 单元格格式化函数 */
  formatter?: (row: RowData, column: TableColumn, cellValue: unknown, index: number) => unknown;
  /** 列对齐方式 */
  align?: AlignType;
  /** 表头对齐方式 */
  headerAlign?: AlignType;
  /** 列自定义类名 */
  className?: string;
  /** 表头自定义类名 */
  headerClassName?: string;
  /** 自定义列插槽名称 */
  slot?: string;
  /** 列合并策略 */
  colSpan?: number | ((row: RowData, column: TableColumn, index: number) => number);
  /** 行合并策略 */
  rowSpan?: number | ((row: RowData, column: TableColumn, index: number) => number);
  /** 是否支持排序 */
  sortable?: boolean;
  /** 当前排序状态 */
  sortOrder?: SortOrder;
  /** 自定义排序方法 */
  sortMethod?: (a: unknown, b: unknown) => number;
}

export interface TableEmits {
  // 用户交互事件
  (e: "row-click", row: RowData, index: number): void;
  (e: "header-click", column: TableColumn, event: Event): void;

  // 分页事件
  (e: "page-change", payload: { pageSize: number; pageNum: number }): void;
  (e: "page-size-change", pageSize: number): void;

  // 排序事件
  (e: "sort-change", config: SortConfig): void;

  // 当前行变化
  (e: "current-change", currentRow: RowData | null): void;

  // 选择事件
  (e: "selection-change", selectedRows: RowData[]): void;

  // 选择行事件
  (e: "select", row: RowData, selected: boolean): void;

  // 全选事件
  (e: "select-all", selected: boolean): void;

  // 更新已选择行
  (e: "update:selectedRows", selectedRows: RowData[]): void;
}

/** 单元格插槽属性 */
export interface CellSlotProps {
  row: RowData;
  column: TableColumn;
  $index: number;
  value: unknown;
  prop: string;
}

/** 表头插槽属性 */
export interface HeaderSlotProps {
  column: TableColumn;
  index: number;
}

/** 表格组件实例类型 */
export interface TableInstance {
  /** 表格根元素引用 */
  ref: Ref<HTMLElement | undefined>;
  /** 手动刷新表格数据方法 */
  refresh: () => Promise<void>;
  /** 清除排序状态方法 */
  clearSort: () => void;
  /** 切换行选择状态 */
  toggleRowSelection: (row: RowData, selected?: boolean) => void;
  /** 切换全选状态 */
  toggleAllSelection: (selected: boolean) => void;
  /** 清除所有选择 */
  clearSelection: () => void;
  /** 获取已选择的行 */
  getSelectedRows: () => RowData[];
}

export interface TableCellProps {
  row: Record<string, unknown>;
  column: TableColumn;
  rowIndex: number;
  columnIndex: number;
  pagination?: {
    currentPage?: number;
    pageSize?: number;
    total: number;
  };
  spanMethod?: (data: { row: Record<string, unknown>; column: TableColumn; rowIndex: number; columnIndex: number }) => { rowspan?: number; colspan?: number } | [number, number];
}

export interface McTableHeaderProps {
  columns: TableColumn[];
  showHeader?: boolean;
  getSortOrder?: (prop: string) => SortOrder;
  selectable?: boolean;
  isAllSelected?: boolean;
  isIndeterminate?: boolean;
}

export interface TableHeaderEmits {
  (e: "header-click", column: TableColumn, event: Event): void;
  (e: "sort-change", column: TableColumn): void;
  (e: "select-all", selected: boolean): void;
}

export interface McTableBodyProps {
  data: Record<string, unknown>[];
  columns: TableColumn[];
  rowKey?: string;
  emptyText?: string;
  height?: string | number;
  maxHeight?: string | number;
  pagination?: PaginationConfig;
  spanMethod?: (data: { row: Record<string, unknown>; column: TableColumn; rowIndex: number; columnIndex: number }) => { rowspan?: number; colspan?: number } | [number, number];
  getRowClass?: (row: Record<string, unknown>, index: number) => string[];
  selectable?: boolean;
  selectedRows?: RowData[];
  selectOnRowClick?: boolean;
}

export interface TableBodyEmits {
  (e: "row-click", row: Record<string, unknown>, index: number): void;
  (e: "select", row: RowData, selected: boolean): void;
}
