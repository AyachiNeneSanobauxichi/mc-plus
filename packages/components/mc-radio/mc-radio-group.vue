<!--
 * @Author: Tieju yang
 * @Date: 2025-05-20 08:55:24
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-22 10:46:36
-->
<template>
  <div ref="_ref" class="mc-radio-group" :class="{ 'is-disabled': disabled }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, toRefs } from "vue";
import type { RadioGroupEmits, RadioGroupInstance, RadioGroupProps } from "./types";

// options
defineOptions({
  name: "McRadioGroup",
});

// props
const props = withDefaults(defineProps<RadioGroupProps>(), {
  size: "medium",
});
const { modelValue, disabled, size, name } = toRefs(props);

// emits
const emit = defineEmits<RadioGroupEmits>();

// ref
const _ref = ref<HTMLElement>();

// provide
provide("radioGroup", {
  value: computed(() => modelValue.value),
  size: computed(() => size.value),
  disabled: computed(() => {
    return disabled.value;
  }),
  name: computed(() => name.value),
  change: (val: string | number | boolean) => {
    if (disabled.value) return;
    emit("update:modelValue", val);
    emit("change", val);
  },
});

// expose
defineExpose<RadioGroupInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
.mc-radio-group {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;

  &.is-disabled {
    cursor: not-allowed;
  }
}
</style>
