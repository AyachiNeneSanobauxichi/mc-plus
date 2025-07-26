<template>
  <div class="mc-progress-bar" :style="{ width }">
    <div
      ref="progressBarRef"
      class="mc-progress-bar-wrapper"
      :style="{ width, height }"
    >
      <div
        class="mc-progress-bar-inner"
        :style="{
          transform: `scaleX(${percentageScale})`,
          transitionDuration: `${transitionDuration}ms`,
        }"
      ></div>
    </div>
    <div class="mc-progress-bar-remarks" v-if="showRemarks">
      <slot name="remarks">
        <span>{{ remarks || `${ceil(percentageScale * 100)}%` }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  ProgressBarEmits,
  ProgressBarInstance,
  ProgressBarProps,
} from "./types";
import { computed, ref, useSlots, watch, watchEffect } from "vue";
import { useWidthHeight } from "@mc-plus/hooks";
import { ceil } from "lodash-es";

// options
defineOptions({ name: "McProgressBar" });

// props
const props = withDefaults(defineProps<ProgressBarProps>(), {
  percentage: 0,
  width: "100%",
  height: "4px",
  showPercentage: false,
  transitionDuration: 300,
});

// emits
const emit = defineEmits<ProgressBarEmits>();

// use height width
const { width, height } = useWidthHeight();

// progress bar ref
const progressBarRef = ref<HTMLDivElement>();

// height change
watchEffect(() => {
  if (progressBarRef.value) {
    progressBarRef.value.style.setProperty("--border-radius", height.value);
  }
});

// percentage
const percentageScale = computed<number>(() => {
  const scale = props.percentage / 100;
  if (scale > 1) {
    return 1;
  } else if (scale < 0) {
    return 0;
  } else {
    return scale;
  }
});

// watch percentage
watch(
  () => props.percentage,
  (value) => {
    // complete
    if (value >= 100) {
      emit("complete");
    }
  },
  { immediate: true }
);

// slots
const slots = useSlots();

// show remarks
const showRemarks = computed<boolean>(() => {
  return props.showPercentage || !!props.remarks || !!slots.remarks;
});

// reset
const reset = () => {
  emit("update:percentage", 0);
};

// complete
const complete = () => {
  emit("update:percentage", 100);
  emit("complete");
};

// update percentage
const updatePercentage = (value: number) => {
  emit("update:percentage", value);
};

// expose
defineExpose<ProgressBarInstance>({
  updatePercentage,
  complete,
  reset,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
