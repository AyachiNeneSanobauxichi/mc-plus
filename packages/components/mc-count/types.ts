type CountValue = number | string | undefined;

type CountTheme = "red" | "gray";

type CountType = "medium" | "small" | "tiny";

interface CountProps {
  value?: CountValue;
  theme?: CountTheme;
  type?: CountType;
  hiddenZero?: boolean;
  width?: string | number;
  height?: string | number;
}

interface CountEmits {
  (e: "change", value: CountValue): void;
}

export type { CountValue, CountTheme, CountType, CountProps, CountEmits };
