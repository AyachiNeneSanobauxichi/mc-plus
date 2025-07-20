<template>
  <div
    class="mc-select"
    :class="[
      isExpand && !isDisabled ? 'mc-select-expand' : 'mc-select-collapse',
      {
        'mc-select-disabled': isDisabled,
        'mc-input-focused': isFocused && search,
        [`mc-select--${validateStyle}`]: validateStyle,
        'mc-select--hover': isHover,
      },
    ]"
    ref="wrapperRef"
    :style="style"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="mc-select-trigger" @click="handleClick" ref="triggerRef">
      <div
        class="mc-select-selected-content"
        v-if="selectedOptions.length && !hasSearch"
      >
        <template v-if="!isMulti">
          <component
            :is="selectedSingleOption!._vnode"
            :key="selectedSingleOption!.value"
          />
        </template>
        <template v-else>
          <div class="mc-select-multi-wrapper" ref="tagsWrapperRef">
            <mc-tag
              v-for="item in selectedTags"
              :key="item.value"
              size="x-small"
              type="selectable"
              :emphasis="tagStyle"
              :disabled="isDisabled"
              @delete="handleDeleteTag(item)"
            >
              {{ item.label }}
            </mc-tag>
          </div>
        </template>
      </div>
      <div
        class="mc-select-input-wrapper"
        :class="{
          'mc-select-input-wrapper-search': hasSearch || showPlaceholder,
        }"
      >
        <input
          class="mc-select-input"
          :class="{ 'mc-select-input-readonly': !search }"
          ref="inputRef"
          type="text"
          :placeholder="showPlaceholder ? placeholder : ''"
          v-model="searchValue"
          @input="handleSearch"
          @focus="handleFocus"
          @blur="handleBlur"
          :readonly="!search"
          :disabled="isDisabled"
        />
      </div>
      <template v-if="showStatusIcon">
        <div
          class="mc-select__status"
          :class="[
            isError ? 'mc-select__status--error' : 'mc-select__status--success',
          ]"
        >
          <mc-icon :name="isError ? 'Reject_02' : 'Accept_02'" :size="24" />
        </div>
      </template>
      <div
        class="mc-select-icon-wrapper"
        :class="{ 'mc-select-icon-wrapper-expand': isExpand && !isDisabled }"
      >
        <mc-icon name="Down-Chevron" class="mc-select-icon" />
      </div>
    </div>
    <transition name="mc-select-dropdown-transition">
      <div
        class="mc-select-dropdown-wrapper"
        v-show="isExpand && !isDisabled"
        :style="{
          paddingTop: showDropdownHeader ? '40px' : '0',
          paddingBottom: showDropdownFooter ? '48px' : '0',
        }"
      >
        <mc-title
          v-if="showDropdownHeader"
          class="mc-select-dropdown-header"
          :show-tool-bar="false"
          height="40px"
        >
          <div class="mc-select-dropdown-header-content">
            <mc-checkbox
              v-model="selectAll"
              content="Select All"
              :form-validate="false"
              :partial="selectPartial"
              @change="handleSelectAllChange"
            />
          </div>
        </mc-title>
        <div class="mc-select-dropdown-content">
          <div class="mc-select-dropdown">
            <slot></slot>
            <div v-if="noData" class="mc-select-no-data">
              <slot name="empty">No data</slot>
            </div>
          </div>
        </div>
        <mc-footer v-if="showDropdownFooter" class="mc-select-dropdown-footer">
          <template #right-button-group>
            <mc-button type="link" size="small" @click="handleReset">
              Reset
            </mc-button>
            <mc-button type="plain" size="small" @click="handleApply">
              Apply
            </mc-button>
          </template>
        </mc-footer>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type {
  SelectEmits,
  SelectOptionProps,
  SelectProps,
  SelectTag,
  SelectValue,
} from "./types";
import type { TagEmphasis } from "../mc-tag";
import { ref, provide, watch, computed } from "vue";
import { SELECT_INJECTION_KEY } from "./constant";
import { filter, includes, isNil, lowerCase, map, toString } from "lodash-es";
import { useClickOutside, useFocusController } from "@mc-plus/hooks";
import { useFormDisabled, useFormItem } from "../mc-form/hooks";
import McIcon from "../mc-icon/mc-icon.vue";
import McButton from "../mc-button/mc-button.vue";
import McTag from "../mc-tag/mc-tag.vue";
import McCheckbox from "../mc-checkbox/mc-checkbox.vue";
import McTitle from "../mc-title/mc-title.vue";
import McFooter from "../mc-footer/mc-footer.vue";

// options
defineOptions({ name: "McSelect" });

// props
const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: "Please select",
  multiple: false,
  allowReset: true,
  allowSelectAll: true,
});

// emits
const emits = defineEmits<SelectEmits>();

// ref
const inputRef = ref<HTMLInputElement>();
const tagsWrapperRef = ref<HTMLDivElement>();
const triggerRef = ref<HTMLDivElement>();

// disabled
const isDisabled = useFormDisabled();

// multi
const isMulti = computed(() => props.multiple);

// multi value
const isMultiValue = (
  modelValue: SelectProps["modelValue"]
): modelValue is SelectValue[] => {
  return isMulti.value && Array.isArray(modelValue);
};

// select options
const selectOptions = ref<SelectOptionProps[]>([]);
// remove option
const removeOption = (option: SelectOptionProps) => {
  selectOptions.value = selectOptions.value.filter(
    (item) => item.value !== option.value
  );
};
// add option
const addOption = (option: SelectOptionProps) => {
  selectOptions.value.push(option);
};

// filter options
const filterOptions = computed(() => {
  if (isNil(searchValue.value)) return selectOptions.value;
  return selectOptions.value.filter((item) => {
    return lowerCase(toString(item.label ?? item.value)).includes(
      lowerCase(searchValue.value)
    );
  });
});

// use focus controller
const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(
  inputRef,
  {
    afterBlur() {
      // after blur validate
      formItem?.validate("blur");
    },
  }
);

// no data
const noData = computed(() => {
  return filterOptions.value.length === 0;
});

// show dropdown header
const showDropdownHeader = computed(() => {
  return isMulti.value && props.allowSelectAll && !noData.value;
});

// show dropdown footer
const showDropdownFooter = computed(() => {
  return isMulti.value && props.allowReset && !noData.value;
});

// expand
const isExpand = ref<boolean>(false);

// click event
const handleClick = () => {
  isExpand.value = !isExpand.value;
};

// get select values
const getSelectValues = () => {
  return isMultiValue(props.modelValue)
    ? [...props.modelValue]
    : [props.modelValue as SelectValue];
};

// select values
const selectValues = ref<SelectValue[]>(getSelectValues());

// select value change
watch(
  () => props.modelValue,
  () => {
    selectValues.value = getSelectValues();
    formItem?.validate("change");
  }
);

// selected options
const selectedOptions = computed<SelectOptionProps[]>(() => {
  return filter(selectOptions.value, (item) =>
    includes(selectValues.value, item.value)
  );
});

// selected single option
const selectedSingleOption = computed<SelectOptionProps | undefined>(() => {
  return isMulti.value ? undefined : selectedOptions.value?.[0];
});

// selected multi option tags
const selectedTags = computed<SelectTag[]>(() => {
  if (!isMulti.value) return [];
  return map(selectedOptions.value, (item) => ({
    label: item.label ?? "",
    value: item.value,
  }));
});

// selected tag style
const tagStyle = computed<TagEmphasis>(() => {
  if (isFocused.value || isHover.value) return "minimal";
  else return "bold";
});

// form item context
const { formItem } = useFormItem();

// form item validate status style
const validateStyle = computed(() => {
  switch (formItem?.validateStatus) {
    case "success":
      return "success";
    case "error":
      return "error";
    default:
      return "";
  }
});

// error
const isError = computed(() => validateStyle.value === "error");

// success
const isSuccess = computed(() => validateStyle.value === "success");

// show status icon
const showStatusIcon = computed(
  () => !isDisabled.value && (isError.value || isSuccess.value)
);

// select event
const handleSelect = (item: SelectOptionProps) => {
  if (isMultiValue(props.modelValue)) {
    handleMultiSelect(item);
  } else {
    handleSingleSelect(item);
  }
};

// single select
const handleSingleSelect = (item: SelectOptionProps) => {
  isExpand.value = false;
  emits("update:modelValue", item.value);
  emits("change", item.value);
};

// old selected values
let oldSelectedValues: SelectValue[] = [];

// multi select
const handleMultiSelect = (item: SelectOptionProps) => {
  const newValues = [...(props.modelValue as SelectValue[])];

  if (!includes(newValues, item.value)) {
    newValues.push(item.value);
  } else {
    newValues.splice(newValues.indexOf(item.value), 1);
  }
  emits("update:modelValue", newValues);
};

// reset
const handleReset = () => {
  emits("update:modelValue", [...oldSelectedValues]);
  emits("change", [...oldSelectedValues]);
};

// apply
const handleApply = () => {
  isExpand.value = false;
  emits("change", [...(props.modelValue as SelectValue[])]);
};

// placeholder
const showPlaceholder = computed(() => {
  if (isMultiValue(props.modelValue)) {
    return !props.modelValue?.length;
  } else {
    return !props.modelValue;
  }
});

// search value
const searchValue = ref<string>("");
// search event
const handleSearch = () => {
  isExpand.value = true;
};

// has search
const hasSearch = computed(() => {
  return props.search && searchValue.value.length > 0;
});

// style
const style = computed(() => {
  return {
    ...{
      width: props.width ?? void 0,
      height: props.height ?? void 0,
    },
  };
});

// click outside
useClickOutside(wrapperRef, () => {
  isExpand.value = false;
});

// expand changed
watch(
  () => isExpand.value,
  (val) => {
    if (!val) {
      // clear search value
      setTimeout(() => {
        searchValue.value = "";
      }, 300);
    } else {
      if (isMulti.value) {
        oldSelectedValues = [...(props.modelValue as SelectValue[])];
      }
    }
  },
  {
    flush: "post",
  }
);

// hover
const isHover = ref<boolean>(false);

// delete tag
const handleDeleteTag = (tag: SelectTag) => {
  if (isMultiValue(props.modelValue)) {
    const newValues = [...(props.modelValue as SelectValue[])];
    newValues.splice(newValues.indexOf(tag.value), 1);
    emits("update:modelValue", newValues);
  }
};

// select all
const selectAll = ref<boolean>(false);

// select all by model value
watch(
  () => props.modelValue,
  (val) => {
    if (!isMultiValue(val)) {
      selectAll.value = false;
    } else {
      selectAll.value = val.length === selectOptions.value.length;
    }
  }
);

// select partial
const selectPartial = computed(() => {
  if (!isMultiValue(props.modelValue)) return false;
  return (
    props.modelValue.length > 0 &&
    props.modelValue.length < selectOptions.value.length
  );
});

// select all change
const handleSelectAllChange = (val: boolean) => {
  if (val) {
    emits(
      "update:modelValue",
      selectOptions.value.map((item) => item.value)
    );
  } else {
    emits("update:modelValue", []);
  }
};

// provide
provide(SELECT_INJECTION_KEY, {
  filterOptions,
  selectValues,
  handleSelect,
  removeOption,
  addOption,
});
</script>

<style scoped lang="scss">
@use "./styles/index.scss";
</style>
