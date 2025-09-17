<template>
  <div class="link-cell">
    <span class="link-cell-text">{{ displayLink }}</span>
    <span class="link-cell-desc" v-if="desc">{{ desc }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { LinkCellProps } from "./types";

// options
defineOptions({ name: "LinkCell" });

// props
const props = withDefaults(defineProps<LinkCellProps>(), {
  link: "",
  desc: "",
  default: "--",
});

// display link
const displayLink = computed(() => {
  return props.link || props.default;
});
</script>

<style scoped lang="scss">
@use "@mc-plus/theme/mixins.scss" as mixin;

$link_color: var(--mc-teal-500);
$desc_color: var(--mc-gray-400);

.link-cell {
  @include mixin.flex-center(column, flex-start, flex-start, 0);
  cursor: pointer;

  .link-cell-text {
    @include mixin.font-style($weight: 600, $color: $link_color);
  }

  .link-cell-desc {
    @include mixin.font-style(
      $size: 14px,
      $line-height: 20px,
      $color: $desc_color
    );
  }
}
</style>
