import type { Ref } from "vue";
import type { Options } from "@popperjs/core";
import type { PopperInstance } from "../../mc-popper";
import type { InputGroupPosition } from "../../mc-input-group/types";
import { computed, getCurrentInstance, inject, ref, watch } from "vue";
import { useProp } from "@mc-plus/hooks";
import { INPUT_GROUP_INJECTION_KEY } from "../../mc-input-group/constant";

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

  // input group ctx
  const inputGroupCtx = inject(INPUT_GROUP_INJECTION_KEY, void 0);

  // position
  const inputGroupPotion = useProp<InputGroupPosition>("inputGroupPosition");

  // offset x
  const offsetX = computed<number>(() => {
    if (!inputGroupCtx || !inputGroupPotion.value) {
      return 0;
    } else if (inputGroupPotion.value === "prefix") {
      return -1;
    } else if (inputGroupPotion.value === "suffix") {
      return 1;
    } else {
      return 0;
    }
  });

  // popper options
  const popperOptions: Partial<Options> = {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [offsetX.value, 0],
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
