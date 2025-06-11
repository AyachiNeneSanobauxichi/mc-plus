<template>
  <div
    class="mc-select"
    :class="[
      isExpand && !isDisabled ? 'mc-select-expand' : 'mc-select-collapse',
      {
        'mc-select-disabled': isDisabled,
        [`mc-select--${validateStyle}`]: validateStyle,
      },
    ]"
    ref="_ref"
    :style="style"
  >
    <div class="mc-select-trigger" @click="handleClick">
      <div
        class="mc-select-selected-content"
        v-if="selectedOption && !searchValue"
      >
        <component :is="selectedOption._vnode" :key="selectedOption.value" />
      </div>
      <div class="mc-select-input-wrapper">
        <input
          class="mc-select-input"
          :class="{ 'mc-select-input-readonly': !search }"
          type="text"
          :placeholder="placeholderDisplay"
          v-model="searchValue"
          @input="handleSearch"
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
import type { SelectEmits, SelectOptionProps, SelectProps } from "./types";
import McIcon from "../mc-icon/mc-icon.vue";
import { ref, provide, watch, computed } from "vue";
import { SELECT_INJECTION_KEY } from "./constant";
import { useClickOutside } from "@mc-plus/hooks";
import { isNil, lowerCase } from "lodash-es";
import { useFormDisabled, useFormItem } from "../mc-form/hooks";

// options
defineOptions({ name: "McSelect" });

// props
const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: "",
  type: "single",
  placeholder: "Please select",
});

// emits
const emit = defineEmits<SelectEmits>();

// disabled
const isDisabled = useFormDisabled();

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
    return lowerCase(item.label ?? item.value).includes(
      lowerCase(searchValue.value)
    );
  });
});

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

// select values
const selectValues = ref<string[]>([props.modelValue as string]);
// select value change
watch(
  () => props.modelValue,
  () => {
    selectValues.value = [props.modelValue as string];
  }
);

// selected option
const selectedOption = computed<SelectOptionProps | undefined>(() => {
  return selectOptions.value.find((item) => {
    return item.value === selectValues.value[0];
  });
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
  isExpand.value = false;
  emit("update:modelValue", item.value);
  emit("change", item.value);
  console.log("Form Item: ", formItem);

  formItem?.validate("change");
};

// placeholder display
const placeholderDisplay = computed(() =>
  selectedOption.value ? "" : props.placeholder
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

// ref
const _ref = ref<HTMLElement>();
// click outside
useClickOutside(_ref, () => {
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
</script>

<style scoped lang="scss">
@use "./styles//index.scss";
</style>
