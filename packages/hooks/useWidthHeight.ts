import { computed } from "vue";
import useProp from "./useProp";

const useWidthHeight = () => {
  const widthProp = useProp<number | string>("width");
  const heightProp = useProp<number | string>("height");

  const width = computed(() => {
    return typeof widthProp.value === "number"
      ? `${widthProp.value}px`
      : widthProp.value || "auto";
  });

  const height = computed(() => {
    return typeof heightProp.value === "number"
      ? `${heightProp.value}px`
      : heightProp.value || "auto";
  });

  return { width, height };
};

export default useWidthHeight;
