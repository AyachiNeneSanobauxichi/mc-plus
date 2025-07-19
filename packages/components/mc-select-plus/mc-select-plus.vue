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
                <template v-if="isMulti">
                  <ul class="mc-select-multi-options-wrapper">
                    <li
                      v-for="item in selectedOption"
                      :key="item"
                      class="mc-select-multi-option"
                    >
                      <mc-tag
                        size="x-small"
                        type="selectable"
                        :emphasis="tagStyle"
                        @delete="handleDeleteTag(item)"
                      >
                        {{ getOptionLabel(item) }}
                      </mc-tag>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <component
                    v-if="selectedContent"
                    :is="selectedContent"
                    :key="selectedOption"
                  ></component>
                </template>
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
        <template v-if="hasFilteredOptions && showHeader">
          <mc-title
            v-if="isMulti"
            class="mc-select-dropdown-header"
            :show-tool-bar="false"
            height="40px"
          >
            <slot name="option-header">
              <div class="mc-select-dropdown-header-content">
                <mc-checkbox
                  v-model="isSelectAll"
                  content="Select All"
                  :form-validate="false"
                  :partial="isSelectPartial"
                  @change="selectAll"
                />
              </div>
            </slot>
          </mc-title>
        </template>
        <ul
          class="mc-select-list"
          :style="{
            paddingTop: showHeader ? '40px' : '0',
            paddingBottom: showFooter ? '48px' : '0',
          }"
        >
          <slot></slot>
          <li v-if="!hasFilteredOptions" class="mc-select-empty">
            <slot name="empty">
              <p class="mc-select-text">No results found</p>
            </slot>
          </li>
        </ul>
        <template v-if="hasFilteredOptions && showFooter">
          <mc-footer v-if="isMulti" class="mc-select-dropdown-footer">
            <template #right-button-group>
              <slot name="option-footer">
                <mc-button type="link" size="small" @click="handleReset">
                  Reset
                </mc-button>
                <mc-button type="plain" size="small" @click="handleApply">
                  Apply
                </mc-button>
              </slot>
            </template>
          </mc-footer>
        </template>
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
import type { TagEmphasis } from "../mc-tag";
import { computed, h, onMounted, provide, ref, watch } from "vue";
import { difference, find, includes } from "lodash-es";
import { useClickOutside, useFocusController } from "@mc-plus/hooks";
import {
  useClear,
  useExpand,
  useHover,
  useSearch,
  useSelectAll,
  useSelectOptions,
  useSelectWidthHeight,
} from "./hooks";
import { MC_SELECT, SELECT_INJECTION_KEY } from "./constant";
import McIcon from "../mc-icon/mc-icon.vue";
import McPopper from "../mc-popper/mc-popper.vue";
import McTag from "../mc-tag/mc-tag.vue";
import McTitle from "../mc-title/mc-title.vue";
import McFooter from "../mc-footer/mc-footer.vue";
import McCheckbox from "../mc-checkbox/mc-checkbox.vue";
import McButton from "../mc-button/mc-button.vue";

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
  showHeader: false,
  showFooter: false,
});

// emits
const emit = defineEmits<SelectPlusEmits>();

// is multi
const isMulti = computed<boolean>(() => props.multiple);

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
  selectedOption.value = isMulti.value ? [] : void 0;
  clearSearchValue();
  toggleExpand(false);
  dispatchEvents();
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

// has filtered options
const hasFilteredOptions = computed<boolean>(() => {
  return filteredOptions.value.length > 0;
});

// get option label by value
const getOptionLabel = (value: SelectPlusValue) => {
  const _option = find(selectOptions.value, (item) => item.value === value);
  return _option?.label || _option?.value;
};

// handle select
const handleSelect = (value: SelectPlusValue) => {
  // clear search value
  clearSearchValue();

  if (isMulti.value) {
    const _selectedOption = selectedOption.value as SelectPlusValue[];
    // multi
    if (includes(_selectedOption, value)) {
      selectedOption.value = difference(_selectedOption, [value]);
    } else {
      selectedOption.value = [..._selectedOption, value];
    }
  } else {
    // single
    selectedOption.value = value;
  }

  if (!isMulti.value) {
    // close expand
    toggleExpand(false);
  }

  // dispatch events
  dispatchEvents();
};

// selected content
const selectedContent = computed<Component | void>(() => {
  if (isMulti.value) {
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
  () => !hasSearchValue.value && !!selectedOption.value
);

// show placeholder
const showPlaceholder = computed<boolean>(() => {
  return (
    !!props.placeholder && !hasSearchValue.value && selectedOptionEmpty.value
  );
});

// selected tag style
const tagStyle = computed<TagEmphasis>(() => {
  if (isFocused.value) return "minimal";
  else return "bold";
});

// delete tag
const handleDeleteTag = (value: SelectPlusValue) => {
  const _selectedOption = selectedOption.value as SelectPlusValue[];
  selectedOption.value = difference(_selectedOption, [value]);
  dispatchEvents();
};

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

// use select all
const { isSelectAll, isSelectPartial, selectAll } = useSelectAll(
  isMulti,
  selectedOption,
  selectOptions,
  () => {
    if (isSelectAll.value) {
      // select all
      selectedOption.value = selectOptions.value.map((item) => item.value);
    } else {
      // clear selected option
      selectedOption.value = [];
    }
    dispatchEvents();
  }
);

// cache selected option
const cacheSelectedOption = ref<SelectPlusValue[]>([]);

// watch expand
watch(isExpanded, () => {
  if (isExpanded.value && isMulti.value) {
    cacheSelectedOption.value = selectedOption.value as SelectPlusValue[];
  }
});

// handle reset
const handleReset = () => {
  if (!isMulti.value) return;
  selectedOption.value = cacheSelectedOption.value;
  dispatchEvents();
};

// handle apply
const handleApply = () => {
  if (!isMulti.value) return;
  toggleExpand(false);
};

// selected option empty
const selectedOptionEmpty = computed<boolean>(() => {
  return isMulti.value
    ? (selectedOption.value as SelectPlusValue[])?.length <= 0
    : !selectedOption.value;
});

// show clear icon
const showClearIcon = computed<boolean>(() => {
  return _showClearIcon.value && !selectedOptionEmpty.value;
});

// dispatch events
const dispatchEvents = () => {
  emit("update:modelValue", selectedOption.value);
  emit("change", selectedOption.value);
};

// provide
provide<SelectPlusContext>(SELECT_INJECTION_KEY, {
  isMulti,
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
