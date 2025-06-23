<template>
  <div
    class="mc-select"
    :class="[
      isExpand && !isDisabled ? 'mc-select-expand' : 'mc-select-collapse',
      {
        'mc-select-disabled': isDisabled,
        'mc-input-focused': isFocused,
        [`mc-select--${validateStyle}`]: validateStyle,
        'mc-select--input-group-prefix': isPrefix,
        'mc-select--input-group-suffix': isSuffix,
      },
    ]"
    ref="wrapperRef"
    :style="style"
  >
    <div class="mc-select-trigger" @click="handleClick">
      <div
        class="mc-select-selected-content"
        v-if="selectedOptions.length && !searchValue"
      >
        <template v-if="!isMulti">
          <component
            :is="selectedSingleOption!._vnode"
            :key="selectedSingleOption!.value"
          />
        </template>
        <template v-else>
          <div>{{ modelValue }}</div>
        </template>
      </div>
      <div class="mc-select-input-wrapper">
        <input
          class="mc-select-input"
          :class="{ 'mc-select-input-readonly': !search }"
          ref="inputRef"
          type="text"
          :placeholder="placeholderDisplay"
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
        <mc-icon name="Down-Chevron" />
      </div>
    </div>
    <transition name="mc-select-dropdown-transition">
      <div class="mc-select-dropdown-wrapper" v-show="isExpand && !isDisabled">
        <div class="mc-select-dropdown">
          <slot></slot>
          <div v-if="noData" class="mc-select-no-data">
            <slot name="empty">No data</slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type {
  SelectEmits,
  SelectOptionProps,
  SelectProps,
  SelectValue,
} from "./types";
import { ref, provide, watch, computed } from "vue";
import { SELECT_INJECTION_KEY } from "./constant";
import { filter, includes, isNil, lowerCase, toString } from "lodash-es";
import { useClickOutside, useFocusController } from "@mc-plus/hooks";
import { useFormDisabled, useFormItem } from "../mc-form/hooks";
import { useInputGroupAffix } from "../mc-input-group/hooks";
import McIcon from "../mc-icon/mc-icon.vue";

// options
defineOptions({ name: "McSelect" });

// props
const props = withDefaults(defineProps<SelectProps>(), {
  type: "single",
  placeholder: "Please select",
});

// emits
const emits = defineEmits<SelectEmits>();

// ref
const inputRef = ref<HTMLInputElement>();

// disabled
const isDisabled = useFormDisabled();

// multi
const isMulti = computed(() => props.type === "multi-choice");

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
  () =>
    !isDisabled.value &&
    (isError.value || isSuccess.value) &&
    !isPrefix.value &&
    !isSuffix.value
);

// select event
const handleSelect = (item: SelectOptionProps) => {
  isExpand.value = false;
  if (isMultiValue(props.modelValue)) {
    const newValues = [...props.modelValue];

    if (!includes(newValues, item.value)) {
      newValues.push(item.value);
    } else {
      newValues.splice(newValues.indexOf(item.value), 1);
    }
    emits("update:modelValue", newValues);
    emits("change", newValues);
    formItem?.validate("change");
  } else {
    const newValue = props.modelValue === item.value ? void 0 : item.value;
    emits("update:modelValue", newValue);
    emits("change", newValue);
    formItem?.validate("change");
  }
};

// placeholder display
const placeholderDisplay = computed(() =>
  selectOptions.value.length ? "" : props.placeholder
);

// search value
const searchValue = ref<string>("");
// search event
const handleSearch = () => {
  isExpand.value = true;
};

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
    }
  },
  {
    flush: "post",
  }
);

// provide
provide(SELECT_INJECTION_KEY, {
  filterOptions,
  selectValues,
  handleSelect,
  removeOption,
  addOption,
});

// input group
const { isPrefix, isSuffix } = useInputGroupAffix("select");
</script>

<style scoped lang="scss">
@use "./styles/index.scss";
</style>
