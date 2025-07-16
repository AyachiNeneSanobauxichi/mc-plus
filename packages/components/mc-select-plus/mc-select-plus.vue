<template>
  <div class="mc-select-plus">
    <ul class="mc-select-plus-list">
      <options @update-options="handleUpdateOptions">
        <slot></slot>
      </options>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { SelectPlusValue } from "./types";
import Options from "./components/options/options";
import { MC_SELECT } from "./constant";

// options
defineOptions({ name: MC_SELECT });

// handle update options
const handleUpdateOptions = (options: SelectPlusValue[]) => {
  console.log("Options: ", options);
};
</script>

<style scoped lang="scss">
@use "./styles/mc-select.scss";
</style>
