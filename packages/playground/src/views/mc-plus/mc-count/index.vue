<template>
  <div class="playground-count">
    <div class="btn-group">
      <mc-button @click="count++" :use-throttle="false">+1</mc-button>
      <mc-button @click="count--" :use-throttle="false">-1</mc-button>
    </div>
    <mc-count :value="count" :max="10" type="small" theme="red"></mc-count>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { McCount, McButton } from "mc-plus";

const count = ref<number>(8);
</script>

<style scoped lang="scss">
.playground-count {
  width: 800px;
  height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .btn-group {
    display: flex;
    gap: 16px;
    margin-bottom: 32px;
  }
}
</style>
