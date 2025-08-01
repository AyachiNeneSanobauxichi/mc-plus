<template>
  <div class="mc-checkbox-group">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type {
  CheckboxGroupContext,
  CheckboxGroupEmits,
  CheckboxGroupProps,
  CheckboxValue,
} from "./types";
import { computed, provide } from "vue";
import { indexOf } from "lodash-es";
import { useFormValidate } from "../mc-form/hooks";
import { CHECKBOX_GROUP_INJECTION_KEY } from "./constant";

// options
defineOptions({ name: "McCheckboxGroup" });

// props
const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  modelValue: () => [],
  disabled: false,
});

// emits
const emits = defineEmits<CheckboxGroupEmits>();

// form item
const { formDisabled } = useFormValidate();

// select
const handleSelect = (val?: CheckboxValue) => {
  if (formDisabled.value || !val) return;

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
</script>

<style scoped lang="scss"></style>
