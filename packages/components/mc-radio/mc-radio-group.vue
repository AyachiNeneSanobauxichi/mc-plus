<template>
  <div class="mc-radio-group" :id="formId">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type {
  RadioGroupProps,
  RadioGroupContext,
  RadioGroupEmits,
  RadioValue,
} from "./types";
import { computed, provide } from "vue";
import { useFormValidate } from "../mc-form/hooks";
import { RADIO_INJECTION_KEY } from "./constant";

// options
defineOptions({ name: "McRadioGroup" });

// props
const props = defineProps<RadioGroupProps>();

// emits
const emits = defineEmits<RadioGroupEmits>();

// form item
const { formId } = useFormValidate();

// select
const handleSelect = (val?: RadioValue) => {
  emits("update:modelValue", val);
  emits("change", val);
};

// provide
provide<RadioGroupContext>(RADIO_INJECTION_KEY, {
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  handleSelect,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-radio-group.scss";
</style>
