import type { McTableSort } from "./mc-table";

export interface McTableSortProps {
  sort: McTableSort;
}

export interface McTableSortEmits {
  (e: "update:sort", sort: McTableSort): void;
}
