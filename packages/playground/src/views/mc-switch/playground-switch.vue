<template>
  <div class="playground-switch">
    <mc-switch
      v-model="check"
      on-text="on"
      off-text="off"
      label="Mc Switch"
    ></mc-switch>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import McSwitch from "../../../../components/mc-switch-v2/mc-switch.vue";

const check = ref<boolean>(false);
</script>

<style scoped lang="scss"></style>
