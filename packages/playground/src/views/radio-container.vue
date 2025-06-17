<template>
  <div class="radio-container">
    <div>
      <mc-radio-group v-model="stu">
        <mc-radio value="yui" label="Hirasawa Yui"></mc-radio>
        <mc-radio value="azusa" label="Nakano Azusa"></mc-radio>
        <mc-radio value="mio" label="Akiyama Mio"></mc-radio>
        <mc-radio value="ritsu" label="Tainaka Ritsu"></mc-radio>
        <mc-radio value="mugi" label="Kotobuku Tsumugi"></mc-radio>
      </mc-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import McRadioGroup from "../../../components/mc-radio/mc-radio-group.vue";
import McRadio from "../../../components/mc-radio/mc-radio.vue";

const stu = ref<string>("yui");
</script>

<style scoped lang="scss">
.radio-container {
  width: 1200px;
  height: 800px;
  background-color: lightgreen;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
