import type { Ref } from "vue";
import { isArray } from "lodash-es";
import useEventListener from "./useEventListener";

export default function useClickOutside(
  elementRef: Ref<HTMLElement | void | HTMLElement[]>,
  callback: (e: MouseEvent) => void
) {
  useEventListener(document, "click", (e: Event) => {
    if (elementRef.value && e.target) {
      if (isArray(elementRef.value)) {
        // elementRef array
        let isClickOutside = true;
        for (let i = 0; i < elementRef.value.length; i++) {
          if (elementRef.value[i].contains(e.target as HTMLElement)) {
            isClickOutside = false;
            break;
          }
        }
        if (isClickOutside) {
          callback(e as MouseEvent);
        }
      } else {
        // elementRef
        if (!elementRef.value.contains(e.target as HTMLElement)) {
          callback(e as MouseEvent);
        }
      }
    }
  });
}
