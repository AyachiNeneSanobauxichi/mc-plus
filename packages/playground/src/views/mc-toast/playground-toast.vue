<template>
  <div>
    <mc-toast
      message="Mc Toast"
      type="warning"
      @close="handleClose"
      :duration="3000"
    ></mc-toast>
  </div>
</template>

<script setup lang="ts">
import McToast from "../../../../components/mc-toast-v2/mc-toast.vue";

const handleClose = () => {
  console.log("Toast Close");
};
</script>

<style scoped lang="scss"></style>
