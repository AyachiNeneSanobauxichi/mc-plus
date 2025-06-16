<template>
  <div class="button-container">
    <mc-button
      right-icon="Right"
      @click="handleButtonClick"
      :loading="isLoading"
      size="medium"
      disabled
    >
      Next Step
    </mc-button>
    <div class="blank"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import McButton from "../../../components/mc-button/mc-button.vue";

// loading
const isLoading = ref<boolean>(false);

// button click
const handleButtonClick = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
};
</script>

<style scoped lang="scss">
.button-container {
  display: flex;
  .blank {
    flex: 3;
  }
}
</style>
