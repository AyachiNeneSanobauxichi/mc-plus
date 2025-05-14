<template>
  {{ modelValue }}
  <div class="container">
    <mc-collapse v-model="modelValue" accordion>
      <mc-collapse-item name="Yui" title="Yui">
        {{ "Hirasawa Yui" }}
      </mc-collapse-item>
      <mc-collapse-item name="Mio" title="Mio">
        {{ "Akiyama Mio" }}
      </mc-collapse-item>
      <mc-collapse-item name="Azusa" title="Azusa">
        {{ "Nakano Azusa" }}
      </mc-collapse-item>
      <mc-collapse-item name="Ritsu" title="Ritsu">
        {{ "Tainaka Ritsu" }}
      </mc-collapse-item>
      <mc-collapse-item name="Mugi" title="Mugi">
        {{ "Kotobuku Tsumugi" }}
      </mc-collapse-item>
    </mc-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { McCollapse, McCollapseItem } from "mc-plus";

const modelValue = ref(["Yui"]);
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 800px;
  padding: 200px;
  box-sizing: border-box;
  background-color: #fff;
}
</style>
