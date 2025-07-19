import { onMounted, ref, watch } from "vue";
import { useWidthHeight } from "@mc-plus/hooks";

const useSelectWidthHeight = () => {
  // select ref
  const selectRef = ref<HTMLDivElement>();

  // use width and height
  const { width, height } = useWidthHeight();

  // set width
  const setWidth = () => {
    if (!selectRef.value) return;
    selectRef.value.style.setProperty("--mc-select-width", width.value);
  };

  // init width
  onMounted(() => {
    setWidth();
  });

  // width changed
  watch(
    () => width.value,
    () => setWidth()
  );

  return { selectRef, width, height, setWidth };
};

export default useSelectWidthHeight;
