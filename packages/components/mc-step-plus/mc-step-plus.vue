<template>
  <div class="mc-step-plus">
    <div class="mc-step-container">
      <template v-for="stepItem in stepItems" :key="stepItem.step">
        <div
          class="mc-step-item"
          :class="{
            'mc-step-item-child': stepItem.isChild,
            'mc-step-item-actived': isActivedStep(stepItem),
            'mc-step-item-success': isSuccessStep(stepItem),
          }"
          v-if="showStep(stepItem)"
        >
          <div
            class="mc-step-item-indicator"
            @click="handleClickStep(stepItem)"
          >
            <div class="mc-step-item-icon">
              <div
                class="mc-step-item-icon-number"
                v-if="!stepItem.isChild && !isNil(stepItem.parentIndex)"
              >
                <template v-if="isSuccessStep(stepItem)">
                  <mc-success-icon />
                </template>
                <template v-else>
                  <template v-if="stepItem.iconContent">
                    <component
                      :is="stepItem.iconContent"
                      :key="stepItem.step"
                    />
                  </template>
                  <template v-else-if="stepItem.icon">
                    <mc-icon :name="stepItem.icon" />
                  </template>
                  <template v-else>
                    {{ stepItem.parentIndex + 1 }}
                  </template>
                </template>
              </div>
              <div class="mc-step-item-icon-point" v-else></div>
            </div>
          </div>
          <div class="mc-step-item-content">
            <div class="mc-step-item-content-title">
              <div class="mc-step-item-label">
                <template v-if="stepItem.labelContent">
                  <component :is="stepItem.labelContent" :key="stepItem.step" />
                </template>
                <template v-else>
                  <div class="mc-step-item-label-title">
                    {{ stepItem.label }}
                  </div>
                </template>
              </div>
              <div class="mc-step-item-desc">
                <template v-if="stepItem.descContent">
                  <component :is="stepItem.descContent" :key="stepItem.step" />
                </template>
                <template v-else>
                  <div class="mc-step-item-desc-title">{{ stepItem.desc }}</div>
                </template>
              </div>
            </div>
            <div
              class="mc-step-item-content-display"
              v-if="showContent(stepItem)"
            >
              <component :is="stepItem.content" :key="stepItem.step" />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  McStepEmits,
  McStepInstance,
  McStepItem,
  McStepKey,
  McStepProps,
} from "./types";
import { watchEffect } from "vue";
import { isNil } from "lodash-es";
import McSuccessIcon from "../mc-success-icon/mc-success-icon.vue";
import McIcon from "../mc-icon/mc-icon.vue";
import { MC_STEP_PLUS } from "./constant";
import { useStepItem } from "./hooks";

// options
defineOptions({ name: MC_STEP_PLUS });

// props
const props = withDefaults(defineProps<McStepProps>(), {
  modelValue: undefined,
  successBehavior: "manual",
  previousBehavior: "last-child",
});

// emits
const emit = defineEmits<McStepEmits>();

// use step item
const {
  stepItems,
  activedStep,
  isActivedStep,
  showStep,
  isSuccessStep,
  showContent,
} = useStepItem();

// handle click step
const handleClickStep = (stepItem: McStepItem) => {
  emit("click:step", stepItem.step);
};

// go previous step
const goPreviousStep = () => {
  const index = activedStep.value?.index || -1;
  if (index > 0) {
    let previousIndex = index - 1;
    let previousStep = stepItems.value[previousIndex];
    if (
      activedStep.value?.isChild &&
      activedStep.value.parentStep === previousStep
    ) {
      previousStep = stepItems.value[previousIndex - 1];
    }

    if (props.previousBehavior === "first-child") {
      if (previousStep?.isChild && !isNil(previousStep.parentStep?.index)) {
        previousIndex = previousStep.parentStep.index + 1;
        previousStep = stepItems.value[previousIndex];
      }
    }

    if (previousStep?.step) {
      emitChange(previousStep.step);
    }
  }
};

// go next step
const goNextStep = () => {
  const index = activedStep.value?.index || -1;
  if (index < stepItems.value.length - 1) {
    let nextIndex = index + 1;
    let nextStep = stepItems.value[nextIndex];
    if (nextStep.hasChildren) {
      nextStep = stepItems.value[nextIndex + 1];
    }

    if (nextStep?.step) {
      emitChange(nextStep.step);
    }
  }
};

// go step
const goStep = (step?: McStepKey) => {
  if (!step) {
    goNextStep();
  } else {
    emitChange(step);
  }
};

// emit change
const emitChange = (step: McStepKey) => {
  emit("update:modelValue", step);
  emit("change", step);
};

// expose
defineExpose<McStepInstance>({
  goStep,
  goNextStep,
  goPreviousStep,
});

watchEffect(() => {
  console.log("Step Items: ", stepItems.value);
});
</script>

<style scoped lang="scss">
@use "./styles/mc-step-plus.scss";
</style>
