<template>
  <div
    v-if="isShow"
    class="mc-select-dropdown-item mc-select-option"
    :class="{ 'mc-select-option-icon-active': isActive }"
    @click="handleClick"
    ref="_ref"
  >
    <div class="mc-select-option-content">
      <slot>{{ label }}</slot>
    </div>
    <div class="mc-select-option-icon">
      <mc-icon name="Tick" v-if="isActive" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SelectOptionInstance, SelectOptionProps } from "./types";
import McIcon from "../mc-icon/mc-icon.vue";
import { computed, inject, onBeforeUnmount, onMounted, ref } from "vue";
import { SELECT_GROUP_INJECTION_KEY, SELECT_INJECTION_KEY } from "./constant";

// options
defineOptions({
  name: "McSelectOption",
});

// ref
const _ref = ref<HTMLLIElement>();

// props
const props = defineProps<SelectOptionProps>();

// context
const ctx = inject(SELECT_INJECTION_KEY, void 0);
const groupCtx = inject(SELECT_GROUP_INJECTION_KEY, void 0);

// active
const isActive = computed(() => {
  return ctx?.selectValues.value.includes(props.value);
});

// show
const isShow = computed(() => {
  return !!ctx?.filterOptions.value.some((item) => item.value === props.value);
});

// click
const handleClick = () => {
  ctx?.handleSelect(props);
};

onMounted(() => {
  ctx?.addOption({
    ...props,
    group: groupCtx?.groupName,
  });
});

onBeforeUnmount(() => {
  ctx?.removeOption(props);
});

// expose
defineExpose<SelectOptionInstance>({
  isShow: isShow.value,
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-select-option.scss";
</style>
