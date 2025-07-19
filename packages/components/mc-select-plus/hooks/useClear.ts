import { computed, ref } from "vue";
import { useProp } from "@mc-plus/hooks";
import { isFunction } from "lodash-es";

const useClear = (clearFunc: () => void) => {
  // mouse over icon
  const _overIcon = ref<boolean>(false);

  // clearable prop
  const clearable = useProp<boolean>("clearable");

  // show clear icon
  const showClearIcon = computed<boolean>(() => {
    return !!clearable.value && _overIcon.value;
  });

  // mouse over icon
  const mouseOverIcon = (over: boolean) => {
    _overIcon.value = over;
  };

  // clear value
  const clear = () => {
    if (isFunction(clearFunc)) {
      clearFunc();
    }
  };

  return {
    showClearIcon,
    mouseOverIcon,
    clear,
  };
};

export default useClear;
