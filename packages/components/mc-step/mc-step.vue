<template>
  <div class="mc-step" :class="`mc-step-${type}`" ref="_ref">
    <ul class="mc-step-item-container" ref="stepContainerRef">
      <li
        class="mc-step-item"
        :class="{
          'mc-step-item-active': modelValue === step.key,
          'mc-step-item-disabled': step.disabled,
          'mc-step-item-success': index <= successStepIndex,
        }"
        v-for="(step, index) in steps"
        :key="step.key"
      >
        <div class="mc-step-number-container">
          <div class="mc-step-item-number">
            <template v-if="index > successStepIndex || step.disabled">
              <span class="mc-step-item-number-text">{{ index + 1 }}</span>
            </template>
            <template v-else>
              <mc-success />
            </template>
          </div>
        </div>
        <div class="mc-step-item-content">
          <div
            class="mc-step-item-content-title"
            v-if="step.label || step.desc"
          >
            <h3 class="mc-step-item-label">
              {{ step.label }}
            </h3>
            <p class="mc-step-item-desc">
              {{ step.desc }}
            </p>
          </div>
          <div
            class="mc-step-item-component"
            v-if="showVerticalComponent(step)"
          >
            <component :is="step.component" />
          </div>
        </div>
      </li>
      <!-- <div ref="unsuccessLineRef" class="mc-step-line mc-step-unsuccess-line">
        <div ref="successLineRef" class="mc-step-success-line"></div>
      </div> -->
    </ul>
    <div class="mc-step-item-component" v-if="showHorizontalComponent">
      <component :is="showHorizontalComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  StepEmits,
  StepInstance,
  StepItem,
  StepKey,
  StepProps,
} from "./types";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { find, findIndex, throttle } from "lodash-es";
import McSuccess from "../mc-success-icon/mc-success-icon.vue";
import useWindowResize from "@mc-plus/hooks/useWindowResize";

// options
defineOptions({ name: "McStep" });

// props
const props = withDefaults(defineProps<StepProps>(), {
  type: "vertical",
});

// vertical
const isVertical = computed(() => props.type === "vertical");

// emit
const emit = defineEmits<StepEmits>();

// ref
const _ref = ref<HTMLDivElement>();
const stepContainerRef = ref<HTMLUListElement>();
const unsuccessLineRef = ref<HTMLDivElement>();
const successLineRef = ref<HTMLDivElement>();

// current step index
const currentStepIndex = computed(() => {
  return findIndex(props.steps, (step) => step.key === props.modelValue);
});

// defalut success step key
const defaultSuccessStepKey = computed(() => {
  return props.steps[currentStepIndex.value - 1]?.key;
});

// value changed
watch(
  () => props.modelValue,
  (value) => {
    setSuccessStep();
    emit("change", value);
  },
  {
    flush: "post",
  }
);

// success step
const successStep = ref<StepKey>();

// set success step
const setSuccessStep = (key: StepKey = defaultSuccessStepKey.value) => {
  successStep.value = key;
  emit("success", key);
};

// success step index
const successStepIndex = computed(() => {
  return findIndex(props.steps, (step) => step.key === successStep.value);
});

onMounted(() => {
  if (isVertical.value) {
    setVerticalSuccessLine();
  } else {
    setHorizontalLineWidth();
    setHorizontalSuccessLine();
  }

  setSuccessStep();
});

// set vertical success line
const setVerticalSuccessLine = async () => {
  await nextTick();
  const index = successStepIndex.value;

  const successLine = successLineRef.value!;
  if (index < 0) {
    successLine.style.height = `0`;
    return;
  }
  const container = stepContainerRef.value!;
  const items = container.querySelectorAll(".mc-step-item");

  if (index + 1 > items.length - 1) {
    successLine.style.height = `100%`;
    return;
  }

  const successNextItem = items?.[index + 1] as HTMLDivElement;
  const containerRect = container.getBoundingClientRect();
  const successNextItemRect = successNextItem.getBoundingClientRect();
  const successLineHeight = successNextItemRect.top - containerRect.top;

  const percent = successLineHeight / (containerRect.height - 24);

  successLine.style.height = `${percent * 100}%`;
};

// set horizontal line width
const setHorizontalLineWidth = () => {
  const container = stepContainerRef.value!;
  const unsuccessLine = unsuccessLineRef.value!;
  const items = container.querySelectorAll(".mc-step-item");
  const firstItem = items?.[0]?.querySelector(
    ".mc-step-item-number"
  ) as HTMLDivElement;
  const lastItem = items?.[items.length - 1]?.querySelector(
    ".mc-step-item-number"
  ) as HTMLDivElement;

  if (!firstItem || !lastItem) {
    unsuccessLine.style.width = "0px";
    return;
  }

  const containerRect = container.getBoundingClientRect();
  const firstItemRect = firstItem.getBoundingClientRect();
  const lastItemRect = lastItem.getBoundingClientRect();

  unsuccessLine.style.width = `${
    lastItemRect.left - firstItemRect.left - firstItemRect.width
  }px`;
  unsuccessLine.style.left = `${
    firstItemRect.left - containerRect.left + firstItemRect.width
  }px`;
};

// set horizontal success line
const setHorizontalSuccessLine = () => {
  const successLine = successLineRef.value!;
  const successIdx = successStepIndex.value;
  if (successIdx < 0) {
    successLine.style.width = "0";
    return;
  }

  const _percent = (successIdx + 1) / (props.steps.length - 1);
  const percent = _percent > 1 ? 1 : _percent;
  successLine.style.width = `${percent * 100}%`;
};

// show vertical component
const showVerticalComponent = (step: StepItem) => {
  return isVertical.value && step.component && step.key === props.modelValue;
};

// show horizontal component
const showHorizontalComponent = computed(() => {
  return (
    !isVertical.value &&
    find(props.steps, (step) => step.key === props.modelValue)?.component
  );
});

// success step changed
watch(
  () => successStep.value,
  () => {
    if (isVertical.value) {
      setVerticalSuccessLine();
    } else {
      setHorizontalSuccessLine();
    }
  }
);

// window resize
useWindowResize(
  throttle(() => {
    if (isVertical.value) {
      setVerticalSuccessLine();
    } else {
      setHorizontalLineWidth();
      setHorizontalSuccessLine();
    }
  }, 50)
);

// expose
defineExpose<StepInstance>({
  ref: _ref,
  setSuccessStep,
});
</script>

<style scoped lang="scss">
@use "./styles/index.scss";
@use "./styles/mc-step-vertical.scss";
@use "./styles/mc-step-horizontal.scss";
</style>
