<template>
  <div class="tool-tip-container">
    <mc-popper placement="top">
      <mc-icon name="Info" class="info-icon"></mc-icon>
      <template #content>
        <div class="content"></div>
      </template>
    </mc-popper>
  </div>
</template>

<script setup lang="ts">
import { McIcon } from "mc-plus";
import McPopper from "../../../components/mc-popper/mc-popper.vue";
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

.info-icon {
  cursor: pointer;
}

.content {
  width: 200px;
  height: 30px;
  background-color: pink;
}
</style>
