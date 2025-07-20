<template>
  <div class="playground-input-group">
    <mc-input-group></mc-input-group>
  </div>
</template>

<script setup lang="ts">
import McInputGroup from "../../../../components/mc-input-group/mc-input-group.vue";
// import McInput from "../../../../components/mc-input/mc-input.vue";
</script>

<style scoped lang="scss">
.playground-input-group {
  width: 1000px;
  height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
