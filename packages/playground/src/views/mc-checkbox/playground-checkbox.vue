<template>
  <div class="playground-checkbox">
    <div>
      <mc-checkbox-group>
        <mc-checkbox content="Hirasawa Yui" remarks="k-on"></mc-checkbox>
        <mc-checkbox content="Nakano Azusa" remarks="k-on"></mc-checkbox>
        <mc-checkbox content="Akiyama Mio" remarks="k-on"></mc-checkbox>
        <mc-checkbox content="Tainaka Ritsu" remarks="k-on"></mc-checkbox>
        <mc-checkbox content="Kotobuku Tsumugi" remarks="k-on"></mc-checkbox>
      </mc-checkbox-group>
    </div>
    <div class="tool-bar">
      <mc-button @click="handleDisable">Disable</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { McButton } from "mc-plus";
import McCheckboxGroup from "../../../../components/mc-checkbox/mc-checkbox-group.vue";
import McCheckbox from "../../../../components/mc-checkbox/mc-checkbox.vue";

type FormState = {
  students: string[];
};

const formState = reactive<FormState>({
  students: [],
});

const disabled = ref<boolean>(false);

const handleDisable = () => {
  disabled.value = !disabled.value;
};
</script>

<style scoped lang="scss">
.playground-checkbox {
  width: 1200px;
  height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .tool-bar {
    display: flex;
    gap: 16px;
    position: absolute;
    bottom: 0;
  }
}
</style>
