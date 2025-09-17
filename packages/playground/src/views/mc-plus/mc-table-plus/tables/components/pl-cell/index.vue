<template>
  <div class="pl" :class="{ 'pl-negative': !isPositive }">
    <span class="pl-price">{{ value }}</span>
    <span class="pl-percent">
      {{ isPositive ? "+" : "-" }}{{ changeRate }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { PlCellProps } from "./types";
// options
defineOptions({ name: "PlCell" });

// props
withDefaults(defineProps<PlCellProps>(), {
  value: "",
  isPositive: true,
});
</script>

<style scoped lang="scss">
@use "@mc-plus/theme/mixins.scss" as mixin;

$pl_positive_color: var(--mc-success);
$pl_negative_color: var(--mc-error);

.pl {
  @include mixin.flex-center(column, flex-start, flex-end, 0);
  @include mixin.font-style($weight: 600, $color: $pl_positive_color);

  .pl-percent {
    font-weight: 400;
  }

  &.pl-negative {
    color: $pl_negative_color;
  }
}
</style>
