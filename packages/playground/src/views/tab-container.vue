<template>
  <div class="tab-container">
    <mc-tab v-model="activeTab" type="primary">
      <mc-tab-item name="yui" label="HirasawaYui">HirasawaYui</mc-tab-item>
      <mc-tab-item name="azusa" label="NakanoAzusa">NakanoAzusa</mc-tab-item>
      <mc-tab-item name="mio" label="AkiyamaMio">AkiyamaMio</mc-tab-item>
      <mc-tab-item name="ritsu" label="TainakaRitsu">TainakaRitsu</mc-tab-item>
      <mc-tab-item name="mugi" label="KotobukuTsumugi">
        KotobukuTsumugi
      </mc-tab-item>
    </mc-tab>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import McTab from "../../../components/mc-tab/mc-tab.vue";
import McTabItem from "../../../components/mc-tab/mc-tab-item.vue";

const activeTab = ref("mio");
</script>

<style scoped lang="scss">
.tab-container {
  width: 1200px;
  height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
