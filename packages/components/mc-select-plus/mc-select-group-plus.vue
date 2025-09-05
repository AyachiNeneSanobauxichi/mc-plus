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
import { computed, inject } from "vue";
import { useWidthHeight } from "@mc-plus/hooks";
import { MC_SELECT_GROUP, SELECT_INJECTION_KEY } from "./constant";
import { includes } from "lodash-es";

// options
defineOptions({ name: MC_SELECT_GROUP });

// props
const props = withDefaults(defineProps<SelectGroupPlusProps>(), {
  height: 40,
  width: "100%",
});

// select context
const selectCtx = inject(SELECT_INJECTION_KEY || void 0);

// use height and width
const { height, width } = useWidthHeight();

// visible
const isVisible = computed<boolean>(() => {
  return includes(selectCtx?.filteredGroups.value, props.label);
});
</script>

<style scoped lang="scss">
@use "./styles/mc-select-group.scss";
</style>
