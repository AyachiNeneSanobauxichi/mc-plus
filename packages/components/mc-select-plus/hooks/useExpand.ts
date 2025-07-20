import type { Ref } from "vue";
import type { Options } from "@popperjs/core";
import type { PopperInstance } from "../../mc-popper";
import { getCurrentInstance, ref, watch } from "vue";

// use expand
const useExpand = (disabled: Ref<boolean>) => {
  // is expanded
  const isExpanded = ref<boolean>(false);

  // vue instance
  const instance = getCurrentInstance()!;
  // emit
  const { emit } = instance;

  // toggle expand
  const toggleExpand = (expand: boolean) => {
    if (disabled.value) {
      isExpanded.value = false;
    } else {
      isExpanded.value = expand;
    }

    // emit expand event
    emit("expand", expand);
  };

  // popper ref
  const popperRef = ref<PopperInstance>();

  // popper options
  const popperOptions: Partial<Options> = {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 0],
        },
      },
    ],
  };

  // expand changed
  watch(isExpanded, (expand) => {
    if (expand) {
      popperRef.value?.show();
    } else {
      popperRef.value?.hide();
    }
  });

  return { isExpanded, popperRef, popperOptions, toggleExpand };
};

export default useExpand;
