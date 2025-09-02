<template>
  <div class="mc-step-plus">
    <div class="mc-step-container">
      <div
        class="mc-step-item"
        :class="{
          'mc-step-item-child': stepItem.isChild,
          'mc-step-item-actived': isActivedStep(stepItem),
        }"
        v-for="stepItem in stepItems"
        :key="stepItem.step"
      >
        <div class="mc-step-item-indicator">
          <div class="mc-step-item-icon">
            <div class="mc-step-item-icon-number" v-if="!isNil(stepItem.index)">
              {{ stepItem.index + 1 }}
            </div>
            <div class="mc-step-item-icon-point" v-else></div>
          </div>
        </div>
        <div class="mc-step-item-content">
          <div class="mc-step-item-content-title">
            <div class="mc-step-item-label">{{ stepItem.label }}</div>
            <div class="mc-step-item-desc">{{ stepItem.desc }}</div>
          </div>
          <div
            class="mc-step-item-content-display"
            v-if="stepItem.content && isActivedStep(stepItem)"
          >
            <component :is="stepItem.content" :key="stepItem.step" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { McStepPlusProps } from "./types";
import { watchEffect } from "vue";
import { isNil } from "lodash-es";
import { MC_STEP_PLUS } from "./constant";
import { useStepItem } from "./hooks";

// options
defineOptions({ name: MC_STEP_PLUS });

// props
withDefaults(defineProps<McStepPlusProps>(), {
  modelValue: undefined,
});

// use step item
const { stepItems, isActivedStep } = useStepItem();

watchEffect(() => {
  console.log("Step Items: ", stepItems.value);
});
</script>

<style scoped lang="scss">
@use "./styles/mc-step-plus.scss";
</style>
