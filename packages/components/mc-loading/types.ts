export type McLoadingSize = "small" | "medium" | "large";

export type McLoadingType = "pulse" | "spin" | "text";

export interface McLoadingProps {
  loading?: boolean;
  loadingText?: string;
  size?: McLoadingSize;
  type?: McLoadingType;
}
