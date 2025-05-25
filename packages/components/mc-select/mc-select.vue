<template>
  <div>Style: {{ style }}</div>
  <div
    class="mc-select"
    :class="[isExpand ? 'mc-select-expand' : 'mc-select-collapse']"
    ref="_ref"
    :style="style"
  >
    <div class="mc-select-trigger" @click="handleClick">
      <div
        class="mc-select-selected-content"
        v-if="selectedOption && !searchValue"
      >
        <component :is="selectedOption.content" :key="selectedOption.value" />
      </div>
      <div class="mc-select-input-wrapper">
        <input
          class="mc-select-input"
          type="text"
          :placeholder="placeholderDisplay"
          v-model="searchValue"
          @input="handleSearch"
        />
      </div>
      <div
        class="mc-select-icon-wrapper"
        :class="{ 'mc-select-icon-wrapper-expand': isExpand }"
      >
        <mc-icon name="Down-Chevron" />
      </div>
    </div>
    <transition name="mc-select-dropdown-transition">
      <div class="mc-select-dropdown-wrapper" v-show="isExpand">
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
import { ref, provide, watch, computed, useAttrs, toRefs, toValue } from "vue";
import { SELECT_INJECTION_KEY } from "./constant";
import { useClickOutside } from "@mc-plus/hooks";
import { isNil, lowerCase } from "lodash-es";

// options
defineOptions({
  name: "McSelect",
});

// props
const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: "",
  type: "single",
  placeholder: "Please select",
});

// emits
const emit = defineEmits<SelectEmits>();

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
    return lowerCase(item.label).includes(lowerCase(searchValue.value));
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

// is multiple
const isMultiple = (modelValue: string | string[]): modelValue is string[] => {
  return props.type === "multi-choice";
};

// select values
const selectValues = ref<string[]>(
  !isMultiple(props.modelValue) ? [props.modelValue] : props.modelValue ?? []
);
// select value change
watch(
  () => props.modelValue,
  () => {
    if (isMultiple(props.modelValue)) {
      selectValues.value = props.modelValue;
    } else {
      selectValues.value = [props.modelValue];
    }
  }
);

// selected option
const selectedOption = computed<SelectOptionProps | undefined>(() => {
  return selectOptions.value.find((item) => {
    return item.value === selectValues.value[0];
  });
});

// select event
const handleSelect = (item: SelectOptionProps) => {
  // if (isMultiple(props.modelValue)) {
  //   let newValues: string[] = [];
  //   if (props.modelValue.includes(item.value)) {
  //     newValues = selectValues.value = props.modelValue.filter(
  //       (value) => value !== item.value
  //     );
  //   } else {
  //     newValues = [...props.modelValue, item.value];
  //   }
  //   emit("update:modelValue", newValues);
  //   emit("change", newValues);
  // } else {

  isExpand.value = false;
  searchValue.value = "";
  emit("update:modelValue", item.value);
  emit("change", item.value);

  // }
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

// attrs
const attrs = toRefs(useAttrs());
// style
const style = computed(() => {
  return {
    ...toValue(attrs).style,
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
