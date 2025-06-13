<template>
  <div class="upload-container">
    <mc-upload></mc-upload>
  </div>
</template>

<script setup lang="ts">
import McUpload from "../../../components/mc-upload/mc-upload.vue";
</script>

<style scoped lang="scss">
.upload-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
