<template>
  <div class="playground-textarea">
    <mc-textarea></mc-textarea>
  </div>
</template>

<script setup lang="ts">
import McTextarea from "../../../../components/mc-textarea/mc-textarea.vue";
</script>

<style scoped lang="scss">
.playground-textarea {
  width: 80%;
  height: 800px;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  align-items: center;
}
</style>
