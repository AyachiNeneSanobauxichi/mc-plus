<template>
  <div class="mc-checkbox-group">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, watch } from "vue";
import { CHECKBOX_GROUP_INJECTION_KEY } from "./constant";
import type {
  CheckboxGroupContext,
  CheckboxGroupEmits,
  CheckboxGroupProps,
  CheckboxValue,
} from "./types";
import { useFormDisabled, useFormItem } from "../mc-form/hooks";
import { indexOf } from "lodash-es";

// options
defineOptions({ name: "McCheckboxGroup" });

// props
const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  modelValue: () => [],
  disabled: false,
});

// emits
const emits = defineEmits<CheckboxGroupEmits>();

// disabled
const isDisabled = useFormDisabled();

// select
const handleSelect = (val?: CheckboxValue) => {
  if (isDisabled.value || !val) return;

  const newModelValue = [...props.modelValue];
  const index = indexOf(newModelValue, val);

  if (index > -1) {
    newModelValue.splice(index, 1);
  } else {
    newModelValue.push(val);
  }

  emits("update:modelValue", newModelValue);
  emits("change", newModelValue);
};

// provide
provide<CheckboxGroupContext>(CHECKBOX_GROUP_INJECTION_KEY, {
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  handleSelect,
});

// form item
const { formItem } = useFormItem();

// model value changed
watch(
  () => props.modelValue,
  () => {
    formItem?.validate("change");
  }
);
</script>

<style scoped lang="scss"></style>
