<template>
  <div class="mc-select">
    <div class="mc-select-trigger" :style="{ width, height }">
      <div class="mc-select-input-wrapper">
        <input
          v-model="searchValue"
          class="mc-select-input"
          :style="{ width: hasSearchValue ? '100%' : '1px' }"
        />
      </div>
      <mc-icon name="Down-Chevron" :size="24" />
    </div>
    <ul class="mc-select-list">
      <options @update-options="handleUpdateOptions">
        <slot></slot>
      </options>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { SelectPlusProps, SelectPlusValue } from "./types";
import { computed, ref } from "vue";
import { isEmpty } from "lodash-es";
import { useWidthHeight } from "@mc-plus/hooks";
import { MC_SELECT } from "./constant";
import Options from "./components/options/options";
import McIcon from "../mc-icon/mc-icon.vue";

// options
defineOptions({ name: MC_SELECT });

// props
const props = withDefaults(defineProps<SelectPlusProps>(), {
  width: "100%",
  height: "40px",
  placeholder: "Please select",
  disabled: false,
  clearable: false,
  multiple: false,
  search: false,
  modelValue: () => [],
});

// use width and height
const { width, height } = useWidthHeight();

// search value
const searchValue = ref<string>("");

// has search value
const hasSearchValue = computed(() => {
  return !isEmpty(searchValue.value);
});

// handle update options
const handleUpdateOptions = (options: SelectPlusValue[]) => {
  console.log("Options: ", options);
};
</script>

<style scoped lang="scss">
@use "./styles/mc-select.scss";
</style>
