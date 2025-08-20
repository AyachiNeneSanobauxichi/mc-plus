import type { InjectionKey } from "vue";
import type { McTableContext } from "./types";

export const MC_TABLE_PLUS = "McTablePlus";

export const MC_TABLE_COLUMN = "McTableColumn";

export const MC_TABLE_HEADER = "McTableHeader";

export const MC_TABLE_HEADER_CELL = "McTableHeaderCell";

export const MC_TABLE_SORT = "McTableSort";

export const MC_TABLE_BODY = "McTableBody";

export const MC_TABLE_BODY_CELL = "McTableBodyCell";

export const MC_TABLE_FOOTER = "McTableFooter";

export const MC_TABLE_TOTAL = "McTableTotal";

export const MC_TABLE_PAGE_SIZE = "McPageSize";

export const MC_TABLE_PAGINATION = "McTablePagination";

export const MC_TABLE_ELLIPSIS = "McTableEllipsis";

export const MC_TABLE_DEFAULT_PROPS = {
  fixed: "none",
  sortable: false,
  columnAlign: "left",
};

export const MC_TABLE_DEFAULT_VALUE = "--";

export const MC_TABLE_CTX_KEY: InjectionKey<McTableContext> =
  Symbol("McTableContext");
