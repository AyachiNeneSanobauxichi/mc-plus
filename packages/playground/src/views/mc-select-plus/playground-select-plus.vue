<template>
  <div class="playground-select-plus">
    <mc-select-plus></mc-select-plus>
  </div>
</template>

<script setup lang="ts">
import McSelectPlus from "../../../../components/mc-select-plus/mc-select-plus.vue";
</script>

<style scoped lang="scss">
.playground-select-plus {
  width: 1000px;
  height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
