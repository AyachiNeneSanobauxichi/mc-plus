export type DividerSize = "small" | "medium" | "large";

export type DividerEmphasis = "minimal" | "subtle" | "moderate" | "bold";

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps {
  size?: DividerSize;
  emphasis?: DividerEmphasis;
  orientation?: DividerOrientation;
}
