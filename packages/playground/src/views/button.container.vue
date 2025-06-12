<template>
  <div class="button-container">
    <mc-button class="button"> Mc Button </mc-button>
    <div class="blank"></div>
  </div>
</template>

<script setup lang="ts">
import McButton from "../../../components/mc-button/mc-button.vue";
</script>

<style scoped lang="scss">
.button-container {
  display: flex;
  .button {
    flex: 2;
  }
  .blank {
    flex: 3;
  }
}
</style>
