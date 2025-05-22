<template>
  <div
    class="mc-select"
    :class="[isExpand ? 'mc-select-expand' : 'mc-select-collapse']"
  >
    <div class="mc-select-input-wrapper" @click="handleClick">
      <input class="mc-select-input" type="text" :placeholder="placeholder" />
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
import { ref, provide, watch } from "vue";
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
    emit("update:modelValue", item.value);
    emit("change", item.value);
  }
};

// provide
provide(SELECT_INJECTION_KEY, {
  selectValues,
  handleSelect,
});
</script>

<style scoped lang="scss">
@use "./styles//index.scss";
</style>
