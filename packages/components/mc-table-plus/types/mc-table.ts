import type { VNode } from "vue";
import type { McTableColumnProps } from "./mc-table-column";

export type McTableAlign = "left" | "center" | "right";

export type McTableSort = "asc" | "desc" | "normal";

export type McTableFixed = "left" | "right" | "none";

export interface McTableColumn extends McTableColumnProps {
  headerTitle?: VNode;
  headerDesc?: VNode;
  header?: VNode;
  tableValue?: VNode;
  tableValueContent?: VNode;
}
