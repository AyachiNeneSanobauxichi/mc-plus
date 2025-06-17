<template>
  <div class="tool-tip-container">
    <mc-tooltip content="Mc Tooltip" theme="dark"></mc-tooltip>
  </div>
</template>

<script setup lang="ts">
import McTooltip from "../../../components/mc-tooltip/mc-tooltip.vue";
</script>

<style scoped lang="scss">
.tool-tip-container {
  width: 1200px;
  height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: lightgreen;
}
</style>
