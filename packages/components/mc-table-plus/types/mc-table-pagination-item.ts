export type McTablePaginationItemType =
  | "page"
  | "prev"
  | "next"
  | "first"
  | "last"
  | "ellipsis";

export interface McTablePaginationItemProps {
  type?: McTablePaginationItemType;
  value?: number;
  isActive?: boolean;
  isDisabled?: boolean;
}
