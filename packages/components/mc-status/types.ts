export type StatusType = "info" | "cancel" | "success" | "warning" | "error";

export interface StatusProps {
  type?: StatusType;
}
