/*
 * @Author: Tieju yang
 * @Date: 2025-05-21 14:09:00
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-22 17:09:58
 */
import type { ExtractPropTypes } from "vue";
import type { PaginationChangeEvent } from "../mc-pagination/types";

export type TableSize = "large" | "medium" | "small";
export type TableAlign = "left" | "center" | "right";

export interface TableColumn {
  prop: string;
  label: string;
  width?: string | number;
  minWidth?: string | number;
  fixed?: boolean | "left" | "right";
  formatter?: (row: any, column: TableColumn, cellValue: any, index: number) => any;
  align?: TableAlign;
  className?: string;
  showOverflowTooltip?: boolean;
}

export const tableProps = {
  /**
   * Table data array
   */
  data: {
    type: Array,
    required: true,
  },
  /**
   * Column definitions
   */
  columns: {
    type: Array,
    required: true,
  },
  /**
   * Table size
   */
  size: {
    type: String,
    values: ["large", "medium", "small"],
    default: "large",
  },
  /**
   * Height of table
   */
  height: {
    type: [String, Number],
    default: "",
  },
  /**
   * Max height of table
   */
  maxHeight: {
    type: [String, Number],
    default: "",
  },
  /**
   * Whether table header is visible
   */
  showHeader: {
    type: Boolean,
    default: true,
  },
  /**
   * Whether the row's background color changes when hovering
   */
  rowHover: {
    type: Boolean,
    default: true,
  },
  /**
   * Function to get a row's key
   */
  rowKey: {
    type: [Function, String],
  },
  /**
   * Whether the table is loading
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * Whether to show pagination
   */
  pagination: {
    type: Boolean,
    default: false,
  },
  /**
   * Total number of items for pagination
   */
  total: {
    type: Number,
    default: 0,
  },
  /**
   * Current page for pagination
   */
  currentPage: {
    type: Number,
    default: 1,
  },
  /**
   * Page size for pagination
   */
  pageSize: {
    type: Number,
    default: 10,
  },
  /**
   * Whether to show total count in pagination
   */
  showTotal: {
    type: Boolean,
    default: true,
  },
  /**
   * Whether to show page size selector in pagination
   */
  showSizeChanger: {
    type: Boolean,
    default: true,
  },
  /**
   * Whether to show quick jumper in pagination
   */
  showJumper: {
    type: Boolean,
    default: true,
  },
};

export type TableProps = ExtractPropTypes<typeof tableProps>;

export const tableEmits = {
  /**
   * Triggers when row is clicked
   */
  "row-click": (row: any, column: TableColumn, event: Event) => true,
  /**
   * Triggers when pagination changes
   */
  "update:currentPage": (page: number) => typeof page === "number",
  /**
   * Triggers when page size changes
   */
  "update:pageSize": (pageSize: number) => typeof pageSize === "number",
  /**
   * Triggers when pagination page or size changes
   */
  "pagination-change": (params: PaginationChangeEvent) => true,
};

export type TableEmits = typeof tableEmits;
