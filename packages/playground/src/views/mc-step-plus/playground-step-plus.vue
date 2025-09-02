<template>
  <div class="playground-step-plus">
    <section class="tool-bar">
      <mc-button @click="handlePrevious">Previous</mc-button>
      <mc-button @click="handleNext">Next</mc-button>
    </section>
    <section class="mc-step-wrapper">
      <mc-step-plus v-model="currentStep">
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
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { McButton } from "mc-plus";
import McStepPlus from "../../../../components/mc-step-plus/mc-step-plus.vue";
import McStepItemPlus from "../../../../components/mc-step-plus/mc-step-item-plus.vue";
import McStepChildItemPlus from "../../../../components/mc-step-plus/mc-step-child-item-plus.vue";

const stepList = ref<string[]>(["1", "2", "3", "3-1", "3-2", "3-3", "4"]);

const currentStep = ref<string>(stepList.value[0]);

// handle previous
const handlePrevious = () => {
  const index = stepList.value.indexOf(currentStep.value);
  if (index > 0) {
    currentStep.value = stepList.value[index - 1];
  } else {
    currentStep.value = stepList.value[stepList.value.length - 1];
  }
};

// handle next
const handleNext = () => {
  const index = stepList.value.indexOf(currentStep.value);
  if (index < stepList.value.length - 1) {
    currentStep.value = stepList.value[index + 1];
  } else {
    currentStep.value = stepList.value[0];
  }
};
</script>

<style scoped lang="scss">
@use "@mc-plus/theme/mixins.scss" as mixin;
.playground-step-plus {
  .tool-bar {
    @include mixin.flex-center($justify: flex-start, $gap: 16px);
  }

  .mc-step-wrapper {
    margin-top: 72px;
  }
}
</style>
