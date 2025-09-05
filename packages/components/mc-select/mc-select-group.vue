<template>
  <div class="mc-select-group" v-show="isShow">
    <div class="mc-select-group-label" :style="style">{{ label }}</div>
    <div class="mc-select-group-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  provide,
  toRefs,
  toValue,
  useAttrs,
  type Ref,
} from "vue";
import { SELECT_GROUP_INJECTION_KEY, SELECT_INJECTION_KEY } from "./constant";
import type { SelectGroupProps } from "./types";

defineOptions({ name: "McSelectGroup" });

// props
const props = defineProps<SelectGroupProps>();

// context
const ctx = inject(SELECT_INJECTION_KEY, void 0);

// provide
provide(SELECT_GROUP_INJECTION_KEY, {
  groupName: props.label,
});

// show
const isShow = computed(() => {
  return ctx?.filterOptions.value.some((item) => item._group === props.label);
});

// attrs
const attrs = toRefs(useAttrs());
// style
const style = computed(() => {
  return {
    ...(toValue(attrs)?.style as Ref<Record<string, string>>)?.value,
    ...{
      width: props.width ?? void 0,
      height: props.height ?? void 0,
    },
  };
});
</script>

<style scoped lang="scss">
@use "./styles/mc-select-group";
</style>
