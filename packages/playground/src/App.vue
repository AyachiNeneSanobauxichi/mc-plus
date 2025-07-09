<template>
  <div class="playground">
    <playground-currency-icon></playground-currency-icon>
  </div>
</template>

<script setup lang="ts">
import PlaygroundCurrencyIcon from "./views/mc-currency-icon/playground-currency-icon.vue";
</script>

<style scoped lang="scss">
.playground {
  :deep(.playground-center) {
    position: fixed;
    width: 1200px;
    height: 800px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
