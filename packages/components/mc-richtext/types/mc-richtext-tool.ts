import type { IconType } from "../../mc-icon";

export interface McRichtextToolProps {
  icons: IconType[];
}

export interface McRichTextToolEmits {
  (e: "click", icon: IconType): void;
}
