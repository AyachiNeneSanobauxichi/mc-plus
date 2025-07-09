export type CurrencyIconDirection = "horizontal" | "vertical";

export type CurrencyIconSuffix = "png" | "svg" | "gif" | "jpg" | "jpeg";

export interface CurrencyIconProps {
  currency?: string;
  direction?: CurrencyIconDirection;
  desc?: string;
  cdnUrl?: string;
  suffix?: CurrencyIconSuffix;
  height?: number | string;
  width?: number | string;
}
