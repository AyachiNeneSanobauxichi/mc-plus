<template>
  <div class="playground">
    <!-- <playground-input-group></playground-input-group> -->
    <!-- <playground-select-plus></playground-select-plus> -->
    <!-- <playground-alert-message></playground-alert-message> -->
    <!-- <playground-toast></playground-toast> -->
    <playground-count></playground-count>
  </div>
</template>

<script setup lang="ts">
// import PlaygroundInputGroup from "./views/mc-input-group/playground-input-group.vue";
// import PlaygroundSelectPlus from "./views/mc-select-plus/playground-select-plus.vue";
// import PlaygroundAlertMessage from "./views/mc-alert-message/playground-alert-message.vue";
// import PlaygroundToast from "./views/mc-toast/playground-toast.vue";
import PlaygroundCount from "./views/mc-count/playground-count.vue";
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
