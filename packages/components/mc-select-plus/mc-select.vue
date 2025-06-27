<template>
  <div
    class="mc-select"
    :class="{ 'mc-select-expand': isExpand }"
    :style="{ width }"
    ref="_ref"
  >
    <div
      class="mc-select-wrapper"
      :style="{ height }"
      @click="handleClickWrapper"
    >
      <template v-if="selectedOption">
        <component :is="selectedOption._vnode"></component>
      </template>
    </div>
    <ul class="mc-select-dropdown" v-if="isExpand">
      <slot></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type {
  SelectOptionProps,
  SelectEmits,
  SelectOptinon,
  SelectProps,
} from "./types";
import {
  computed,
  Fragment,
  h,
  provide,
  ref,
  useSlots,
  watch,
  watchEffect,
  type VNode,
} from "vue";
import { useClickOutside } from "@mc-plus/hooks";
import { SELECT_INJECTION_KEY } from "./constant";
import { find } from "lodash-es";

// options
defineOptions({ name: "McSelect" });

// props
const props = withDefaults(defineProps<SelectProps>(), {
  type: "single",
  disabled: false,
  search: false,
  placeholder: "Please select",
  width: "320px",
  height: "40px",
});

// emit
const emit = defineEmits<SelectEmits>();

// slot
const slot = useSlots();

// select items
const selectItems = ref<SelectOptinon[]>([]);

// expand
const isExpand = ref<boolean>(false);

// click wrapper
const handleClickWrapper = () => {
  isExpand.value = !isExpand.value;
};

// ref
const _ref = ref<HTMLElement>();
// click outside
useClickOutside(_ref, () => {
  isExpand.value = false;
});

// generate select items
const generateItems = (vnodes: VNode[]): SelectOptinon[] => {
  const selectOptions: SelectOptinon[] = [];
  const flatten = (vnodes: VNode[], group?: string) => {
    if (vnodes && !Array.isArray(vnodes)) {
      vnodes = (vnodes as { default: () => VNode[] }).default?.();
    }
    vnodes.forEach((vn) => {
      if (vn.type === Fragment) {
        if (vn.children) {
          flatten(vn.children as VNode[], group);
        }
      } else if ((vn.type as { name: string }).name === "McSelectOption") {
        selectOptions.push({
          ...vn.props,
          _group: group,
          _vnode: h(
            "div",
            { class: "mc-select-selected-content" },
            (vn.children as { default: () => VNode })?.default?.()
          ),
        } as SelectOptinon);
      } else if ((vn.type as { name: string }).name === "McSelectGroup") {
        selectOptions.push({
          ...vn.props,
          _isGroup: true,
        } as SelectOptinon);
        flatten(vn.children as VNode[], (vn.props as { value: string })?.value);
      }
    });
  };

  flatten(vnodes);

  return selectOptions;
};

watchEffect(() => {
  const content = slot?.default?.();
  if (content && content.length) {
    selectItems.value = generateItems(content);
    console.log("SelectItems: ", selectItems.value);
  }
});

// select values
const selectValues = ref<string[]>([props.modelValue as string]);
// select value change
watch(
  () => props.modelValue,
  () => {
    selectValues.value = [props.modelValue as string];
  }
);
// selected option
const selectedOption = computed<SelectOptinon | undefined>(() => {
  return find(
    selectItems.value,
    (item) => item.value === selectValues.value[0]
  );
});

// select event
const handleSelect = (item: SelectOptionProps) => {
  isExpand.value = false;
  emit("update:modelValue", item.value);
  emit("change", item.value);
};

// provide
provide(SELECT_INJECTION_KEY, {
  handleSelect,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-select.scss";
</style>
