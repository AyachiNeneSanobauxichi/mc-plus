<template>
  <div
    class="mc-select"
    :class="[isExpand ? 'mc-select-expand' : 'mc-select-collapse']"
  >
    <div class="mc-select-input-wrapper" @click="handleClick">
      <input
        class="mc-select-input"
        type="text"
        v-model="searchValue"
        :placeholder="placeholderDisplay"
        @input="handleSearch"
      />
      <div
        class="mc-select-icon-wrapper"
        :class="{ 'mc-select-icon-wrapper-expand': isExpand }"
      >
        <mc-icon name="Down-Chevron" />
      </div>
    </div>
    <div class="mc-select-dropdown-wrapper" v-if="isExpand">
      <ul class="mc-select-dropdown">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SelectEmits, SelectOptionProps, SelectProps } from "./types";
import McIcon from "../mc-icon/mc-icon.vue";
import { ref, provide, watch, computed, useSlots } from "vue";
import { SELECT_INJECTION_KEY } from "./constant";

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

// slots
const slots = useSlots();

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

// select event
const handleSelect = (item: SelectOptionProps) => {
  if (isMultiple(props.modelValue)) {
    let newValues: string[] = [];
    if (props.modelValue.includes(item.value)) {
      newValues = selectValues.value = props.modelValue.filter(
        (value) => value !== item.value
      );
    } else {
      newValues = [...props.modelValue, item.value];
    }
    emit("update:modelValue", newValues);
    emit("change", newValues);
  } else {
    searchValue.value = "";
    emit("update:modelValue", item.value);
    emit("change", item.value);
  }
};

// placeholder display
const placeholderDisplay = computed(() => {
  if (isMultiple(props.modelValue)) {
    return props.placeholder;
  } else {
    const selectLabel = slots
      .default?.()
      ?.find((slot) => slot.props?.value === props.modelValue)?.props?.label;
    return selectLabel ?? props.modelValue ?? props.placeholder;
  }
});

// search value
const searchValue = ref<string>("");

// search event
const handleSearch = () => {
  isExpand.value = true;
};

// provide
provide(SELECT_INJECTION_KEY, {
  searchValue,
  selectValues,
  handleSelect,
});
</script>

<style scoped lang="scss">
@use "./styles//index.scss";
</style>
