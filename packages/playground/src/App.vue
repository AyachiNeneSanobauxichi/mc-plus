<template>
  <div class="container">
    <mc-switch v-model="value" off-text="OFFFFFFFFFFFFFFFFFFF" on-text="ON">Switch</mc-switch>
  </div>
</template>

<script setup lang="ts">
import McSwitch from "@mc-plus/components/mc-switch/mc-switch.vue";
import { ref } from "vue";
const value = ref<boolean>(false);
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 800px;
  padding: 200px;
  box-sizing: border-box;
  background-color: #fff;
}
</style>
