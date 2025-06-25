<template>
  <div class="mc-secondary-menu">
    <div class="mc-secondary-menu-wrapper" ref="wrapperRef">
      <div
        class="mc-secondary-menu-item"
        :class="{
          'mc-secondary-menu-item-actived': modelValue === item.name,
          'mc-secondary-menu-item-parent': !!item.children?.length,
          'mc-secondary-menu-item-child': !!item.parent,
        }"
        v-for="item in menuItems"
        :key="item.name"
        @click="handleClick(item)"
      >
        <div class="mc-secondary-menu-item-content">
          {{ item.label }}
        </div>
      </div>
      <div class="mc-secondary-menu-success-line" ref="successLineRef"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type {
  SecondaryMenuDisplayItem,
  SecondaryMenuEmits,
  SecondaryMenuItem,
  SecondaryMenuProps,
  SecondaryMenuValue,
} from "./types";
import { findIndex } from "lodash-es";

// options
defineOptions({ name: "McSecondaryMenu" });

// props
const props = withDefaults(defineProps<SecondaryMenuProps>(), {
  options: () => [],
});

// emits
const emits = defineEmits<SecondaryMenuEmits>();

// refs
const wrapperRef = ref<HTMLDivElement>();
const successLineRef = ref<HTMLDivElement>();

// menu items
const menuItems = computed<SecondaryMenuDisplayItem[]>(() => {
  const _items: SecondaryMenuDisplayItem[] = [];
  props.options.forEach((item) => {
    _items.push(item);
    if (item.children) {
      item.children.forEach((child) => {
        _items.push({ ...child, parent: item.name });
      });
    }
  });

  return _items;
});

// click
const handleClick = (option: SecondaryMenuItem) => {
  if (option.children?.length) return;
  emits("update:modelValue", option.name);
  emits("change", option.name);
};

// init
onMounted(() => {
  if (props.modelValue) setSuccessLine(props.modelValue);
  setTimeout(() => {
    if (successLineRef.value) {
      successLineRef.value.style.transition = "top 0.3s ease-in-out";
    }
  });
});

// active item changed
watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      setSuccessLine(props.modelValue);
    }
  }
);

// set success line
const setSuccessLine = (menu: SecondaryMenuValue) => {
  const index = findIndex(menuItems.value, { name: menu });
  if (index < 0 || !successLineRef.value || !wrapperRef.value) return;
  const items = Array.from(wrapperRef.value.children);
  const { top: wrapperTop } = wrapperRef.value.getBoundingClientRect();
  const { top } = items[index].getBoundingClientRect();
  successLineRef.value.style.top = `${top - wrapperTop}px`;
};
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
