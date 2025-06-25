<template>
  <div class="mc-secondary-menu">
    <div class="mc-secondary-menu-wrapper" ref="wrapperRef">
      <div
        class="mc-secondary-menu-item"
        :class="{
          'mc-secondary-menu-item-actived': modelValue === option.name,
        }"
        v-for="option in options"
        :key="option.name"
        @click="handleClick(option)"
      >
        <div class="mc-secondary-menu-item-content">
          {{ option.label }}
        </div>
      </div>
      <div class="mc-secondary-menu-success-line" ref="successLineRef"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import type {
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

// click
const handleClick = (option: SecondaryMenuItem) => {
  emits("update:modelValue", option.name);
  emits("change", option.name);
};

// init
onMounted(() => {
  if (successLineRef.value) {
    successLineRef.value.style.transition = "top 0.3s ease-in-out";
    if (props.modelValue) setSuccessLine(props.modelValue);
  }
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
  const index = findIndex(props.options, { name: menu });
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
