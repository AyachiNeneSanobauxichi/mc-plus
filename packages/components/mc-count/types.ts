type CountValue = number | string | undefined;

type CountTheme = "red" | "gray";

type CountType = "medium" | "small" | "tiny";

interface CountProps {
  value?: CountValue;
  theme?: CountTheme;
  type?: CountType;
  hiddenZero?: boolean;
  max?: number;
}

interface CountEmits {
  (e: "change", value: CountValue): void;
}

export type { CountValue, CountTheme, CountType, CountProps, CountEmits };
