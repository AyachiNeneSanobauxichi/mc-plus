<template>
  <div class="playground-switch">
    <mc-switch
      v-model="check"
      active-text="Show"
      inactive-text="Hide"
      size="large"
      label="Akiyama Mio is a good girl"
      help-text="Akiyama Mio is a good girl"
      label-position="right"
      disabled
    >
    </mc-switch>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import McSwitch from "../../../../components/mc-switch-v2/mc-switch.vue";

const check = ref<boolean>(false);
</script>

<style scoped lang="scss"></style>
