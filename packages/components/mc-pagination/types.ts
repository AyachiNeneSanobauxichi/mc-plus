/*
 * @Author: Tieju yang
 * @Date: 2025-05-23 10:00:00
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-22 15:53:54
 */
import type { ExtractPropTypes } from "vue";

export const paginationProps = {
  /**
   * Current page number
   */
  currentPage: {
    type: Number,
    default: 1,
  },
  /**
   * Items per page
   */
  pageSize: {
    type: Number,
    default: 10,
  },
  /**
   * Total number of items
   */
  total: {
    type: Number,
    required: true,
  },
  /**
   * Number of pager buttons to display
   */
  pagerCount: {
    type: Number,
    default: 5,
    validator: (value: number) => value > 0 && value % 2 === 1,
  },
  /**
   * Whether to show total count
   */
  showTotal: {
    type: Boolean,
    default: true,
  },
  /**
   * Whether to show the page size selector
   */
  showSizeChanger: {
    type: Boolean,
    default: true,
  },
  /**
   * Whether to show quick jumper
   */
  showJumper: {
    type: Boolean,
    default: true,
  },
  /**
   * Available page sizes
   */
  pageSizeOptions: {
    type: Array as () => number[],
    default: () => [10, 20, 50, 100],
  },
  /**
   * Text for "Total"
   */
  totalText: {
    type: String,
    default: "Total",
  },
  /**
   * Text for "items/page"
   */
  pageSizeText: {
    type: String,
    default: "items/page",
  },
  /**
   * Text for "Go to"
   */
  goToText: {
    type: String,
    default: "Go to",
  },
  /**
   * Text for "page"
   */
  pageText: {
    type: String,
    default: "page",
  },
};

export type PaginationProps = ExtractPropTypes<typeof paginationProps>;

export interface PaginationChangeEvent {
  page: number;
  pageSize: number;
}

export const paginationEmits = {
  "update:currentPage": (currentPage: number) => typeof currentPage === "number",
  "update:pageSize": (pageSize: number) => typeof pageSize === "number",
  change: (params: PaginationChangeEvent) => true,
  sizeChange: (pageSize: number) => typeof pageSize === "number",
};

export type PaginationEmits = typeof paginationEmits;
