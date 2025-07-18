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
        <template v-if="showSelectedContext">
          <component :is="selectedContent" :key="selectedOption"></component>
        </template>
      </div>
      <mc-icon name="Down-Chevron" :size="24" class="mc-select-chevron-icon" />
    </div>
    <ul class="mc-select-list">
      <mc-select-options @update-options="handleUpdateOptions">
        <slot></slot>
      </mc-select-options>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type {
  _OptionNode,
  SelectOptionInternalInstance,
  SelectPlusEmits,
  SelectPlusProps,
  SelectPlusValue,
} from "./types";
import type { Component } from "vue";
import {
  computed,
  onMounted,
  provide,
  ref,
  shallowRef,
  watch,
  watchEffect,
} from "vue";
import { find, isEmpty } from "lodash-es";
import { useFocusController, useWidthHeight } from "@mc-plus/hooks";
import { MC_SELECT, SELECT_INJECTION_KEY } from "./constant";
import McSelectOptions from "./components/options";
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
});

// emits
const emit = defineEmits<SelectPlusEmits>();

// refs
const inputRef = ref<HTMLInputElement>();

// is multi
const isMulti = (
  moduleValue: SelectPlusValue | SelectPlusValue[]
): moduleValue is SelectPlusValue[] => {
  return props.multiple;
};

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

// select options
const selectOptions = shallowRef<_OptionNode[]>([]);

// handle update options
const handleUpdateOptions = (options: _OptionNode[]) => {
  selectOptions.value = options;
};

// init
onMounted(() => {
  selectedOption.value = props.modelValue;
});

// model value change
watch(
  () => props.modelValue,
  (newValue) => {
    selectedOption.value = newValue;
  }
);

// selected option
const selectedOption = ref<SelectPlusValue | SelectPlusValue[]>();

// handle select
const handleSelect = (option: SelectOptionInternalInstance["proxy"]) => {
  if (isMulti(props.modelValue)) {
  } else {
    selectedOption.value = option.value;
  }
  emit("update:modelValue", selectedOption.value);
  emit("change", selectedOption.value);
};

// selected content
const selectedContent = computed<Component | void>(() => {
  if (isMulti(props.modelValue)) return void 0;
  else {
    return find(
      selectOptions.value,
      (item) => item.value === selectedOption.value
    )?.context;
  }
});

// show selected context
const showSelectedContext = computed(
  () =>
    selectedContent.value &&
    !hasSearchValue.value &&
    !!selectedOption.value &&
    !isMulti(props.modelValue)
);

// provide
provide(SELECT_INJECTION_KEY, {
  select: handleSelect,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-select.scss";
</style>
