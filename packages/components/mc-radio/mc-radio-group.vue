<template>
  <div class="mc-radio-group">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from "vue";
import type {
  RadioGroupProps,
  RadioGroupContext,
  RadioGroupEmits,
} from "./types";
import { RADIO_INJECTION_KEY } from "./constant";

// options
defineOptions({
  name: "McRadioGroup",
});

// props
const props = defineProps<RadioGroupProps>();

// emits
const emit = defineEmits<RadioGroupEmits>();

// select
const handleSelect = (val?: string) => {
  emit("update:modelValue", val);
  emit("change", val);
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
