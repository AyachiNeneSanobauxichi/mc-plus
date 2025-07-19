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
          ref="inputRef"
          :style="{ width: hasSearchValue ? '100%' : '1px' }"
          :placeholder="placeholder"
          :readonly="!isSearch"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <template v-if="showSelectedContext">
          <slot name="selected-content" :selected-option="selectedOption">
            <component :is="selectedContent" :key="selectedOption"></component>
          </slot>
        </template>
        <p v-if="showPlaceholder" class="mc-select-placeholder">
          <slot name="placeholder">
            {{ placeholder }}
          </slot>
        </p>
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
  _FilteredOptionNode,
  _OptionNode,
  SelectOptionInternalInstance,
  SelectPlusEmits,
  SelectPlusProps,
  SelectPlusValue,
} from "./types";
import type { Component } from "vue";
import { computed, h, onMounted, provide, ref, shallowRef, watch } from "vue";
import {
  filter,
  find,
  includes,
  isEmpty,
  map,
  toLower,
  uniqBy,
} from "lodash-es";
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

// filtered options
const filteredOptions = computed<_FilteredOptionNode[]>(() => {
  return map(
    filter(selectOptions.value, (item) => {
      return includes(toLower(item.label), toLower(searchValue.value));
    }),
    (item) => ({ value: item.value, group: item.group })
  );
});

// filtered groups
const filteredGroups = computed(() => {
  return map(uniqBy(filteredOptions.value, "group"), (item) => item.group);
});

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
  // clear search value
  searchValue.value = "";

  if (isMulti(props.modelValue)) {
    // multi
  } else {
    // single
    selectedOption.value = option.value;
  }

  // emit event
  emit("update:modelValue", selectedOption.value);
  emit("change", selectedOption.value);
};

// selected content
const selectedContent = computed<Component | void>(() => {
  if (isMulti(props.modelValue)) {
    // multi display tags
    return void 0;
  } else {
    // find selected option
    const _option = find(
      selectOptions.value,
      (item) => item.value === selectedOption.value
    );

    // if option has context, return context
    if (_option?.context) return _option.context;
    // else return span with label or value
    else
      return h(
        "span",
        { class: "mc-selected-option-label" },
        _option?.label || _option?.value
      );
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

// show placeholder
const showPlaceholder = computed<boolean>(() => {
  return !!props.placeholder && !selectedOption.value && !hasSearchValue.value;
});

// provide
provide(SELECT_INJECTION_KEY, {
  select: handleSelect,
  filteredOptions,
  filteredGroups,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-select.scss";
</style>
