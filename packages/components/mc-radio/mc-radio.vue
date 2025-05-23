<template>
  <label
    ref="_ref"
    class="mc-radio"
    :class="{
      'is-disabled': isDisabled,
      'is-checked': isChecked,
    }">
    <span class="mc-radio__input">
      <span class="mc-radio__inner"></span>
      <input class="mc-radio__original" type="radio" :value="_value" :disabled="isDisabled" v-model="radioValue" />
    </span>
    <span class="mc-radio__label">
      <span v-if="label">{{ label }}</span>
      <slot v-else></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject, ref, toRefs } from "vue";
import type { RadioEmits, RadioGroupContext, RadioInstance, RadioProps } from "./types";

defineOptions({
  name: "McRadio",
});

const props = withDefaults(defineProps<RadioProps>(), {});
const { modelValue, value: _value, disabled, label } = toRefs(props);

const emit = defineEmits<RadioEmits>();

const _ref = ref<HTMLElement>();
const radioGroup = inject<RadioGroupContext | undefined>("radioGroup", undefined);

const isDisabled = computed(() => radioGroup?.disabled?.value ?? disabled.value);
const checkValue = computed(() => radioGroup?.value.value ?? modelValue.value);
const isChecked = computed(() => checkValue.value === _value.value);

const radioValue = computed({
  get() {
    return radioGroup ? radioGroup.value.value : modelValue.value;
  },
  set(val: string | number | boolean) {
    if (radioGroup) {
      radioGroup.change(val);
    } else {
      emit("update:modelValue", val);
      emit("change", val);
    }
  },
});

defineExpose<RadioInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
