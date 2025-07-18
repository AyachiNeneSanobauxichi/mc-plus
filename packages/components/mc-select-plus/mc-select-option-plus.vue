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
import type {
  SelectOptionInternalInstance,
  SelectOptionPlusProps,
} from "./types";
import { computed, getCurrentInstance, inject, ref } from "vue";
import { useWidthHeight } from "@mc-plus/hooks";
import { MC_SELECT_OPTION, SELECT_INJECTION_KEY } from "./constant";

// options
defineOptions({ name: MC_SELECT_OPTION });

// props
const props = withDefaults(defineProps<SelectOptionPlusProps>(), {
  width: "100%",
  height: 40,
});

// vm
const vm = (getCurrentInstance()! as SelectOptionInternalInstance).proxy;

// use height and width
const { height, width } = useWidthHeight();

// select context
const selectCtx = inject(SELECT_INJECTION_KEY || void 0);

// visible
const isVisible = ref<boolean>(true);

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
  selectCtx?.select(vm);
};
</script>

<style scoped lang="scss">
@use "./styles/mc-select-option.scss";
</style>
