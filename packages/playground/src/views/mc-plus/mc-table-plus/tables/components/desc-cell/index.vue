<template>
  <div class="desc-cell">
    <span class="desc-cell-text">{{ displayText }}</span>
    <span class="desc-cell-desc" v-if="desc">{{ desc }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { DescCellProps } from "./types";

// options
defineOptions({ name: "DescCell" });

// props
const props = withDefaults(defineProps<DescCellProps>(), {
  value: "",
  desc: "",
  default: "--",
});

// display link
const displayText = computed(() => {
  return props.value || props.default;
});
</script>

<style scoped lang="scss">
@use "@mc-plus/theme/mixins.scss" as mixin;

$desc_color: var(--mc-gray-400);

.desc-cell {
  @include mixin.flex-center(column, flex-start, flex-end, 0);

  .desc-cell-text {
    @include mixin.font-style;
  }

  .desc-cell-desc {
    @include mixin.font-style($color: $desc_color);
  }
}
</style>
