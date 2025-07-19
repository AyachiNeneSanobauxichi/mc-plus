<template>
  <div
    ref="selectRef"
    class="mc-select"
    :class="{ 'mc-select-expanded': isExpanded }"
  >
    <mc-popper
      ref="popperRef"
      placement="bottom-start"
      trigger="manual"
      class="mc-select-popper"
      :style="{ width }"
      :show-arrow="false"
      :popper-options="popperOptions"
      :hide-timeout="100"
    >
      <template #default>
        <div
          ref="triggerRef"
          class="mc-select-trigger"
          :class="{
            'mc-select-trigger-focused': isFocused,
            'mc-select-trigger-disabled': false,
          }"
          :style="{ width, height }"
          @click="handleTriggerClick"
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
              @input="handleInput"
              @keydown.enter="handleEnter"
              @keydown.arrow-down="handlePressArrow"
              @keydown.arrow-up="handlePressArrow"
            />
            <template v-if="showSelectedContext">
              <slot name="selected-content" :selected-option="selectedOption">
                <component
                  :is="selectedContent"
                  :key="selectedOption"
                ></component>
              </slot>
            </template>
            <p v-if="showPlaceholder" class="mc-select-placeholder">
              <slot name="placeholder">
                {{ placeholder }}
              </slot>
            </p>
          </div>
          <div
            class="mc-select-icon-wrapper"
            @mouseenter="mouseOverIcon(true)"
            @mouseleave="mouseOverIcon(false)"
          >
            <template v-if="showClearIcon">
              <mc-icon
                name="Reject"
                :size="20"
                class="mc-select-clear-icon"
                @click.stop="clear"
              />
            </template>
            <template v-else>
              <mc-icon
                name="Down-Chevron"
                :size="24"
                class="mc-select-chevron-icon"
                :class="{
                  'mc-select-chevron-icon-rotate': isExpanded,
                }"
              />
            </template>
          </div>
        </div>
      </template>
      <template #content>
        <ul class="mc-select-list">
          <slot></slot>
          <li v-if="filteredOptions.length <= 0" class="mc-select-empty">
            <slot name="empty">
              <p class="mc-select-text">No results found</p>
            </slot>
          </li>
        </ul>
      </template>
    </mc-popper>
  </div>
</template>

<script setup lang="ts">
import type {
  _FilteredOptionNode,
  _OptionNode,
  SelectPlusContext,
  SelectPlusEmits,
  SelectPlusProps,
  SelectPlusValue,
} from "./types";
import type { Component } from "vue";
import { computed, h, onMounted, provide, ref, watch } from "vue";
import { find } from "lodash-es";
import { useClickOutside, useFocusController } from "@mc-plus/hooks";
import {
  useClear,
  useExpand,
  useHover,
  useSearch,
  useSelectOptions,
  useSelectWidthHeight,
} from "./hooks";
import { MC_SELECT, SELECT_INJECTION_KEY } from "./constant";
import McIcon from "../mc-icon/mc-icon.vue";
import McPopper from "../mc-popper/mc-popper.vue";

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

// is multi
const isMulti = (
  // @ts-ignore
  modelValue: SelectPlusValue | SelectPlusValue[]
): modelValue is SelectPlusValue[] => {
  return props.multiple;
};

// input ref
const inputRef = ref<HTMLInputElement>();

// use focus controller
const {
  wrapperRef: triggerRef,
  isFocused,
  handleFocus,
  handleBlur,
} = useFocusController(inputRef);

// use select width  height
const { selectRef, width, height } = useSelectWidthHeight();

// use select options
const { selectOptions } = useSelectOptions();

// use search
const {
  searchValue,
  isSearch,
  hasSearchValue,
  filteredOptions,
  filteredGroups,
  clearSearchValue,
} = useSearch(selectOptions);

// use expand
const { isExpanded, popperRef, popperOptions, toggleExpand } = useExpand();

// use hover
const { hoverOption, setHoverOption, handlePressArrow, clearHoverOption } =
  useHover(filteredOptions);

// use clear
const {
  showClearIcon: _showClearIcon,
  mouseOverIcon,
  clear,
} = useClear(() => {
  selectedOption.value = isMulti(props.modelValue) ? [] : void 0;
  clearSearchValue();
  toggleExpand(false);
});

// use click outside
useClickOutside(selectRef, () => {
  clearSearchValue();
  toggleExpand(false);
});

// init value
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
const handleSelect = (value: SelectPlusValue) => {
  // clear search value
  clearSearchValue();

  if (isMulti(props.modelValue)) {
    // multi
  } else {
    // single
    selectedOption.value = value;
  }

  // close expand
  toggleExpand(false);

  // dispatch events
  dispatchEvents();
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

// watch expand
watch(isExpanded, () => {
  clearHoverOption();
});

// handle trigger click
const handleTriggerClick = () => {
  toggleExpand(!isExpanded.value);
};

// handle input
const handleInput = () => {
  clearHoverOption();
  toggleExpand(true);
};

// press enter
const handleEnter = () => {
  if (isExpanded.value) {
    if (hoverOption.value) {
      handleSelect(hoverOption.value);
    } else {
      toggleExpand(false);
    }
  } else {
    toggleExpand(true);
  }
};

// show clear icon
const showClearIcon = computed<boolean>(() => {
  return _showClearIcon.value && !!selectedOption.value;
});

// dispatch events
const dispatchEvents = () => {
  emit("update:modelValue", selectedOption.value);
  emit("change", selectedOption.value);
};

// provide
provide<SelectPlusContext>(SELECT_INJECTION_KEY, {
  selectedOption,
  filteredOptions,
  filteredGroups,
  hoverOption,
  select: handleSelect,
  hover: setHoverOption,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-select.scss";
</style>
