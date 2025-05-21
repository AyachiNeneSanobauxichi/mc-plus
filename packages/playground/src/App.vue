<template>
  <div class="container">
    <div class="show-value">
      <span>Trigger: {{ trigger }}</span>
      <span>Disabled: {{ disabled }}</span>
    </div>
    <mc-tooltip :trigger="trigger" :disabled="disabled">
      <template #default>McTooltip</template>
      <template #content>
        <div class="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          consectetur facilis vel officia ratione voluptatibus velit perferendis
          debitis? Sunt fugit dolor nulla rerum. Aperiam vitae repellat
          consectetur deleniti autem asperiores.
        </div>
      </template>
    </mc-tooltip>
    <div class="tool-bar">
      <mc-button @click="changeTrigger">Change Trigger</mc-button>
      <mc-button @click="changeDisabled">Change disabled</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { McButton } from "mc-plus";
import McTooltip from "@mc-plus/components/mc-tooltip/mc-tooltip.vue";

const trigger = ref<"hover" | "click">("hover");
const changeTrigger = () => {
  trigger.value = trigger.value === "hover" ? "click" : "hover";
};

const disabled = ref<boolean>(false);
const changeDisabled = () => {
  disabled.value = !disabled.value;
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 800px;
  padding: 200px;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;

  .content {
    width: 320px;
    background-color: pink;
  }

  .show-value {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .tool-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    position: absolute;
    bottom: 0;
  }
}
</style>
