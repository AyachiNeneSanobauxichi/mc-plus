<template>
  <div class="mc-select">
    <div
      class="mc-select-trigger"
      :class="{ 'mc-select-trigger-focused': isFocused }"
      :style="{ width, height }"
      ref="triggerRef"
    >
      <div
        class="mc-select-input-wrapper"
        :style="{ cursor: isSearch ? 'text' : 'pointer' }"
      >
        <input
          v-model="searchValue"
          class="mc-select-input"
          :style="{ width: hasSearchValue ? '100%' : '1px' }"
          ref="inputRef"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>
      <mc-icon name="Down-Chevron" :size="24" class="mc-select-chevron-icon" />
    </div>
    <ul class="mc-select-list">
      <options @update-options="handleUpdateOptions">
        <slot></slot>
      </options>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { SelectPlusProps, SelectPlusValue } from "./types";
import { computed, ref } from "vue";
import { isEmpty } from "lodash-es";
import { useFocusController, useWidthHeight } from "@mc-plus/hooks";
import { MC_SELECT } from "./constant";
import Options from "./components/options/options";
import McIcon from "../mc-icon/mc-icon.vue";

// options
defineOptions({ name: MC_SELECT });

// props
const props = withDefaults(defineProps<SelectPlusProps>(), {
  width: "100%",
  height: "40px",
  placeholder: "Please select",
  disabled: false,
  clearable: false,
  multiple: false,
  search: false,
  modelValue: () => [],
});

// refs
const inputRef = ref<HTMLInputElement>();

// use focus controller
const {
  wrapperRef: triggerRef,
  isFocused,
  handleFocus,
  handleBlur,
} = useFocusController(inputRef);

// use width and height
const { width, height } = useWidthHeight();

// search value
const searchValue = ref<string>("");

// is search
const isSearch = computed(() => {
  return !!props.search;
});

// has search value
const hasSearchValue = computed(() => {
  return isSearch.value && !isEmpty(searchValue.value);
});

// handle update options
const handleUpdateOptions = (options: SelectPlusValue[]) => {
  console.log("Options: ", options);
};
</script>

<style scoped lang="scss">
@use "./styles/mc-select.scss";
</style>
