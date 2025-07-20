import { computed, inject } from "vue";
import { INPUT_GROUP_INJECTION_KEY } from "./constant";

// input group affix hook
export function useInputGroupAffix(type: "input" | "select" = "input") {
  const inputGroupCtx = inject(INPUT_GROUP_INJECTION_KEY, void 0);

  const isPrefix = computed(() => {
    if (!inputGroupCtx) return false;
    return inputGroupCtx[type] === "prefix";
  });

  const isSuffix = computed(() => {
    if (!inputGroupCtx) return false;
    return inputGroupCtx[type] === "suffix";
  });

  return { inputGroupCtx, isPrefix, isSuffix };
}
