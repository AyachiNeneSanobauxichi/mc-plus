<template>
  <li
    v-show="isVisible"
    role="option"
    class="mc-select-option"
    :class="{
      'mc-select-option-actived': isActived && !isMulti,
      'mc-select-option-hover': isHover,
    }"
    :style="{ height, width }"
    :aria-selected="isSelected"
    @mouseenter="handleHover"
    @click.stop="handleSelect"
  >
    <slot :is-actived="isActived">
      <template v-if="isMulti">
        <mc-select-multi-option
          :model-value="isActived"
          :label="currentLabel"
        ></mc-select-multi-option>
      </template>
      <template v-else>
        <span class="mc-select-option-label">{{ currentLabel }}</span>
      </template>
    </slot>
  </li>
</template>

<script setup lang="ts">
import type {
  SelectOptionPlusProps,
  SelectPlusContext,
  SelectPlusValue,
} from "./types";
import { computed, inject, ref } from "vue";
import { find, includes } from "lodash-es";
import { useWidthHeight } from "@mc-plus/hooks";
import { MC_SELECT_OPTION, SELECT_INJECTION_KEY } from "./constant";
import McSelectMultiOption from "./mc-select-multi-option.vue";

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
const selectCtx = inject<SelectPlusContext>(SELECT_INJECTION_KEY || void 0);

// visible
const isVisible = computed<boolean>(() => {
  return !!find(selectCtx?.filteredOptions.value, (item) => {
    return item.value === props.value;
  });
});

// is multi
const isMulti = computed<boolean>(() => !!selectCtx?.isMulti.value);

// actived
const isActived = computed<boolean>(() => {
  if (isMulti.value) {
    const _selectedOption = selectCtx?.selectedOption
      .value as SelectPlusValue[];
    return includes(_selectedOption, props.value);
  } else {
    return selectCtx?.selectedOption.value === props.value;
  }
});

// selected
const isSelected = ref<boolean>(false);

// current label
const currentLabel = computed(() => props.label);

// hover
const handleHover = () => {
  selectCtx?.hover(props.value);
};

// is hover
const isHover = computed<boolean>(() => {
  return selectCtx?.hoverOption.value === props.value;
});

// select
const handleSelect = () => {
  selectCtx?.select(props.value);
};
</script>

<style scoped lang="scss">
@use "./styles/mc-select-option.scss";
</style>
