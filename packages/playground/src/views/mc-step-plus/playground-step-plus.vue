<template>
  <div class="playground-step-plus">
    <mc-step-plus>
      <mc-step-item-plus step="1" label="Step 1" desc="Step 1 description">
        Child 1
      </mc-step-item-plus>
      <mc-step-item-plus step="2" label="Step 2" desc="Step 2 description">
        Child 2
      </mc-step-item-plus>
      <mc-step-item-plus step="3" label="Step 3" desc="Step 3 description">
        <mc-step-child-item-plus
          step="3-1"
          label="Step 3-1"
          desc="Step 3-1 description"
        >
          Grandchild 3-1
        </mc-step-child-item-plus>
        <mc-step-child-item-plus
          step="3-2"
          label="Step 3-2"
          desc="Step 3-2 description"
        >
          Grandchild 3-2
        </mc-step-child-item-plus>
        <mc-step-child-item-plus
          step="3-3"
          label="Step 3-3"
          desc="Step 3-3 description"
        >
          Grandchild 3-3
        </mc-step-child-item-plus>
      </mc-step-item-plus>
      <mc-step-item-plus step="4" label="Step 4" desc="Step 4 description">
        Child 4
      </mc-step-item-plus>
    </mc-step-plus>
  </div>
</template>

<script setup lang="ts">
import McStepPlus from "../../../../components/mc-step-plus/mc-step-plus.vue";
import McStepItemPlus from "../../../../components/mc-step-plus/mc-step-item-plus.vue";
import McStepChildItemPlus from "../../../../components/mc-step-plus/mc-step-child-item-plus.vue";
</script>

<style scoped lang="scss"></style>
