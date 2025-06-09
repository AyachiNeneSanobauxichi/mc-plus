<template>
  <div class="mc-select">
    <div class="mc-select-wrapper"></div>
    <div class="mc-select-dropdown">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Fragment, ref, useSlots, watchEffect, type VNode } from "vue";
import type { SelectEmits, SelectOptinon, SelectProps } from "./types";

// options
defineOptions({ name: "McSelect" });

// props
withDefaults(defineProps<SelectProps>(), {
  type: "single",
  disabled: false,
  search: false,
  placeholder: "Please select",
});

// emit
const emit = defineEmits<SelectEmits>();

// slot
const slot = useSlots();

// select items
const selectItems = ref<SelectOptinon[]>([]);

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
          _vnode: vn,
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

  console.log("Select Options: ", selectOptions);

  return selectOptions;
};

watchEffect(() => {
  const content = slot?.default?.();
  // console.log("Content: ", content);
  if (content && content.length) {
    generateItems(content);
  }
});
</script>

<style scoped lang="scss">
@use "./styles/mc-select.scss";
</style>
