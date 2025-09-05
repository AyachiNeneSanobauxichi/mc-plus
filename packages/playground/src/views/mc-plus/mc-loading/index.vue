<template>
  <div class="playground-loading">
    <mc-loading loading loading-text="Loading..." size="large"></mc-loading>
  </div>
</template>

<script setup lang="ts">
import { McLoading } from "mc-plus";
</script>

<style scoped lang="scss">
.playground-loading {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding-top: 500px;
}
</style>
