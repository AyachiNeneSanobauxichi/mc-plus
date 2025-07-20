<template>
  <div class="mc-select-multi-option">
    <mc-checkbox
      :model-value="modelValue"
      :content="label"
      :form-validate="false"
      @update:model-value="handleUpdateModelValue"
    />
  </div>
</template>

<script setup lang="ts">
import type { SelectMultiOptionEmits, SelectMultiOptionProps } from "./types";
import { MC_SELECT_MULTI_OPTION } from "./constant";
import McCheckbox from "../mc-checkbox/mc-checkbox.vue";

// options
defineOptions({ name: MC_SELECT_MULTI_OPTION });

// props
withDefaults(defineProps<SelectMultiOptionProps>(), {
  modelValue: false,
});

// emits
const emit = defineEmits<SelectMultiOptionEmits>();

// handle update model value
const handleUpdateModelValue = (value: boolean) => {
  emit("update:modelValue", value);
};
</script>
