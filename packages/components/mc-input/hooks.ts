import { ref, type Ref } from "vue";
import { endsWith, startsWith } from "lodash-es";

interface CursorContext {
  selectionStart?: number;
  selectionEnd?: number;
  value?: string;
  beforeTxt?: string;
  afterTxt?: string;
}

// cursor hook
export function useCursor(inputRef: Ref<HTMLInputElement | void>) {
  // cursor context
  const cursor = ref<CursorContext>();

  // record cursor position
  const recordCursor = () => {
    if (!inputRef.value) return;
    const { selectionStart, selectionEnd, value } = inputRef.value;
    if (!selectionStart || !selectionEnd) return;

    // get before and after text
    const beforeTxt = value.slice(0, selectionStart);
    const afterTxt = value.slice(selectionEnd);

    cursor.value = {
      selectionStart,
      selectionEnd,
      value,
      beforeTxt,
      afterTxt,
    };
  };

  // set cursor correct position
  const setCursor = () => {
    if (!inputRef.value || !cursor.value) return;
    const { value } = inputRef.value;
    const { beforeTxt, afterTxt, selectionStart } = cursor.value;

    if (!beforeTxt || !afterTxt || !selectionStart) return;

    // cursor position
    let position = value.length;

    if (endsWith(value, afterTxt)) {
      position = value.length - afterTxt.length;
    } else if (startsWith(value, beforeTxt)) {
      position = beforeTxt.length;
    } else {
      const beforeLastChar = beforeTxt[selectionStart - 1];
      const newIndex = value.indexOf(beforeLastChar, selectionStart - 1);
      if (newIndex !== -1) {
        position = newIndex + 1;
      }
    }

    inputRef.value.setSelectionRange(position, position);
  };

  return {
    recordCursor,
    setCursor,
  };
}
