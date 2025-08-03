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
import { CHECKBOX_GROUP_INJECTION_KEY, MC_CHECKBOX_GROUP } from "./constant";

// options
defineOptions({ name: MC_CHECKBOX_GROUP });

// props
const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  modelValue: () => [],
  disabled: false,
});

// emits
const emits = defineEmits<CheckboxGroupEmits>();

// select
const handleSelect = (val?: CheckboxValue) => {
  if (!val) return;

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
