<template>
  <div
    class="mc-select"
    :class="[isExpand ? 'mc-select-expand' : 'mc-select-collapse']"
  >
    <div class="mc-select-input-wrapper" @click="handleClick">
      <input class="mc-select-input" type="text" :placeholder="placeholder" />
      <div
        class="mc-select-icon-wrapper"
        :class="{ 'mc-select-icon-wrapper-expand': isExpand }"
      >
        <mc-icon name="Down-Chevron" />
      </div>
    </div>
    <div class="mc-select-dropdown-wrapper" v-if="isExpand">
      <ul class="mc-select-dropdown">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SelectEmits, SelectOptionProps, SelectProps } from "./types";
import McIcon from "../mc-icon/mc-icon.vue";
import { ref, provide, watch } from "vue";
import { SELECT_INJECTION_KEY } from "./constant";

// options
defineOptions({
  name: "McSelect",
});

// props
const props = withDefaults(defineProps<SelectProps>(), {
  type: "single",
  placeholder: "Please select",
});

// emits
const emit = defineEmits<SelectEmits>();

// expand
const isExpand = ref<boolean>(false);

// click event
const handleClick = () => {
  isExpand.value = !isExpand.value;
};

// select values
const selectValues = ref<string[]>([props.modelValue ?? ""]);
// select value change
watch(
  () => props.modelValue,
  () => {
    selectValues.value = [props.modelValue ?? ""];
  }
);

// select event
const handleSelect = (item: SelectOptionProps) => {
  emit("update:modelValue", item.value);
};

// provide
provide(SELECT_INJECTION_KEY, {
  selectValues,
  handleSelect,
});
</script>

<style scoped lang="scss">
@use "./styles//index.scss";
</style>
