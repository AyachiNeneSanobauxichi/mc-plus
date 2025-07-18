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
          :readonly="!isSearch"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <template v-if="!hasSearchValue && selectedContext?.key">
          <component
            :is="selectedContext.component"
            :key="selectedContext.key"
          ></component>
        </template>
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
import type {
  SelectOptionInternalInstance,
  SelectPlusProps,
  SelectPlusValue,
} from "./types";
import { computed, provide, ref, type Component } from "vue";
import { isEmpty } from "lodash-es";
import { useFocusController, useWidthHeight } from "@mc-plus/hooks";
import { MC_SELECT, SELECT_INJECTION_KEY } from "./constant";
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
  // console.log("Options: ", options);
};

// selected context
const selectedContext = ref<{
  key?: SelectPlusValue;
  component?: Component;
}>();

// handle select
const handleSelect = (option: SelectOptionInternalInstance["proxy"]) => {
  console.log("Option: ", option);
  selectedContext.value = {
    key: option.value,
    component: option.$slots?.["default"],
  };
  console.log("Selected Context: ", selectedContext.value);
};

// provide
provide(SELECT_INJECTION_KEY, {
  select: handleSelect,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-select.scss";
</style>
