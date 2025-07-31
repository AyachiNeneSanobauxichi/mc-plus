<template>
  <div class="mc-radio-group" :id="formId">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, watch } from "vue";
import type {
  RadioGroupProps,
  RadioGroupContext,
  RadioGroupEmits,
  RadioValue,
} from "./types";
import { RADIO_INJECTION_KEY } from "./constant";
import { useFormItem } from "../mc-form/hooks";

// options
defineOptions({ name: "McRadioGroup" });

// props
const props = defineProps<RadioGroupProps>();

// emits
const emits = defineEmits<RadioGroupEmits>();

// form item
const { formId, formItem } = useFormItem();

// select
const handleSelect = (val?: RadioValue) => {
  emits("update:modelValue", val);
  emits("change", val);
};

// model value changed
watch(
  () => props.modelValue,
  () => {
    formItem?.validate("change");
  }
);

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
