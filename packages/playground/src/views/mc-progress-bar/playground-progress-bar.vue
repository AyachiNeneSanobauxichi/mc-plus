<template>
  <div class="playground-progress-bar">
    <mc-progress-bar :percentage="percentage" show-percentage></mc-progress-bar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import McProgressBar from "../../../../components/mc-progress-bar/mc-progress-bar.vue";

const percentage = ref(0);

let timer: NodeJS.Timeout;

onMounted(() => {
  timer = setInterval(() => {
    percentage.value += 1;
    if (percentage.value >= 100) {
      clearInterval(timer);
    }
  }, 100);
});
</script>

<style scoped lang="scss">
.playground-progress-bar {
  position: fixed;
  width: 80%;
  height: 900px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
