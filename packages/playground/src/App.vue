<template>
  <div>
    <mc-button
      rightIcon="arrow-right"
      @click="handleClick"
      :loading="loading"
      :throttleDuration="1000"
    >
      Next Step
    </mc-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { McButton } from "mc-plus";

const loading = ref<boolean>(false);
const handleClick = () => {
  console.log("Next Step Clicked");
  // loading.value = true;
  // setTimeout(() => {
  //   loading.value = false;
  // }, 2000);
};
</script>
