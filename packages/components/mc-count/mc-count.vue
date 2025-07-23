<template>
  <i
    class="mc-count"
    :class="[`mc-count-${theme}`, `mc-count-${type}`]"
    v-if="isShow"
  >
    <span class="mc-count-number" v-if="!isTiny">
      {{ displayValue }}
    </span>
  </i>
</template>

<script setup lang="ts">
import type { CountEmits, CountProps } from "./types";
import { computed, watch } from "vue";

// options
defineOptions({ name: "McCount" });

// props
const props = withDefaults(defineProps<CountProps>(), {
  theme: "red",
  type: "medium",
  hiddenZero: true,
  max: 99,
});

// emits
const emit = defineEmits<CountEmits>();

// number value
const numberValue = computed<number>(() => {
  const _value = Number(props.value);
  if (isNaN(_value)) {
    console.warn("mc-count: value is not a number");
    return 0;
  }
  return _value;
});

// is show
const isShow = computed<boolean>(() => {
  if (props.hiddenZero) {
    return numberValue.value > 0;
  } else {
    return true;
  }
});

// display value
const displayValue = computed<string>(() => {
  if (props.max && numberValue.value > props.max) {
    return `${props.max}+`;
  } else {
    return `${numberValue.value}`;
  }
});

// is tiny
const isTiny = computed<boolean>(() => {
  return props.type === "tiny";
});

// watch value
watch(
  () => props.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      emit("change", newVal);
    }
  }
);
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
