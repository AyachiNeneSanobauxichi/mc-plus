<template>
  <div class="playground-input">
    <mc-input v-model="inputValue" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import McInput from "../../../../components/mc-input/mc-input.vue";

const inputValue = ref("");
</script>

<style scoped lang="scss"></style>
