<template>
  <li
    v-show="isVisible"
    class="mc-select-option"
    :style="{ height, width }"
    role="option"
    :aria-disabled="isDisabled || undefined"
    :aria-selected="isSelected"
    @mousemove="handleHover"
    @click.stop="handleSelect"
  >
    <slot>
      <span class="mc-select-option-label">{{ currentLabel }}</span>
    </slot>
  </li>
</template>

<script setup lang="ts">
import type { SelectOptionPlusProps } from "./types";
import { computed, ref } from "vue";
import { useWidthHeight } from "@mc-plus/hooks";

// options
defineOptions({ name: "McSelectOptionPlus" });

// props
const props = withDefaults(defineProps<SelectOptionPlusProps>(), {
  width: "100%",
  height: 40,
});

// use height and width
const { height, width } = useWidthHeight();

// visible
const isVisible = ref<boolean>(true);

// disabled
const isDisabled = ref<boolean>(false);

// selected
const isSelected = ref<boolean>(false);

// current label
const currentLabel = computed(() => props.label);

// hover
const handleHover = () => {
  console.log("hover");
};

// select
const handleSelect = () => {
  console.log("select");
};
</script>

<style scoped lang="scss">
@use "./styles/mc-select-option.scss";
</style>
