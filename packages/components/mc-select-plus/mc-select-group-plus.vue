<template>
  <ul v-show="isVisible" class="mc-select-group">
    <li class="mc-select-group-label" :style="{ height, width }">
      {{ label }}
    </li>
    <li>
      <ul class="mc-select-option-list">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { SelectGroupPlusProps } from "./types";
import { ref } from "vue";
import { useWidthHeight } from "@mc-plus/hooks";

// options
defineOptions({ name: "McSelectGroup" });

// props
withDefaults(defineProps<SelectGroupPlusProps>(), {
  height: 40,
  width: "100%",
});

// use height and width
const { height, width } = useWidthHeight();

// visible
const isVisible = ref<boolean>(true);
</script>

<style scoped lang="scss">
@use "./styles/mc-select-group.scss";
</style>
