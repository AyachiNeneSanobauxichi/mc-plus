<template>
  <li
    v-show="isVisible"
    class="mc-select-option"
    :style="{ height, width }"
    role="option"
    :aria-disabled="isDisabled"
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
import { computed, inject, ref } from "vue";
import { find } from "lodash-es";
import { useWidthHeight } from "@mc-plus/hooks";
import { MC_SELECT_OPTION, SELECT_INJECTION_KEY } from "./constant";

// options
defineOptions({ name: MC_SELECT_OPTION });

// props
const props = withDefaults(defineProps<SelectOptionPlusProps>(), {
  width: "100%",
  height: 40,
});

// use height and width
const { height, width } = useWidthHeight();

// select context
const selectCtx = inject(SELECT_INJECTION_KEY || void 0);

// visible
const isVisible = computed<boolean>(() => {
  return !!find(selectCtx?.filteredOptions.value, (item) => {
    return item.value === props.value;
  });
});

// disabled
const isDisabled = ref<boolean>(false);

// selected
const isSelected = ref<boolean>(false);

// current label
const currentLabel = computed(() => props.label);

// hover
const handleHover = () => {};

// select
const handleSelect = () => {
  selectCtx?.select(props.value);
};
</script>

<style scoped lang="scss">
@use "./styles/mc-select-option.scss";
</style>
