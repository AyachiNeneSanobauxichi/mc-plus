<template>
  <div class="lightbox-container">
    <mc-light-box :v-model="visible">
      <div class="light-box-content">Light Box</div>
    </mc-light-box>
    <mc-button @click="handleChangeVisible">Change Visible</mc-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import McLightBox from "../../../components/mc-light-box/mc-light-box.vue";
import { McButton } from "mc-plus";

const visible = ref<boolean>(false);
const handleChangeVisible = () => {
  visible.value = !visible.value;
};
</script>

<style scoped lang="scss">
.light-box-content {
  width: 100%;
  height: 800px;
  background-color: lightgreen;
}
</style>
