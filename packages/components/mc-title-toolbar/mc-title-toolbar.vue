<template>
  <div class="mc-title-toolbar" ref="_ref">
    <div v-if="showReset" class="mc-title-toolbar-reset">
      <mc-reset :rotate="isRotate" @reset="handleReset" :auto-rotate="false">
        <template #default>
          <slot name="reset"></slot>
        </template>
      </mc-reset>
    </div>
    <div v-if="showReset && showMandatory" class="mc-title-toolbar-line"></div>
    <div v-if="showMandatory" class="mc-title-toolbar-mandatory">
      <slot name="mandatory">Mandatory</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  McTitleToolbarEmits,
  McTitleToolbarInstance,
  McTitleToolbarProps,
} from "./types";
import { ref } from "vue";
import { throttle } from "lodash-es";
import McReset from "../mc-reset/mc-reset.vue";
import { MC_TITLE_TOOLBAR } from "./constanst";

// options
defineOptions({ name: MC_TITLE_TOOLBAR });

//props
withDefaults(defineProps<McTitleToolbarProps>(), {
  showReset: true,
  showMandatory: true,
});

// ref
const _ref = ref<HTMLDivElement>();

// emit
const emit = defineEmits<McTitleToolbarEmits>();

// route
const isRotate = ref<boolean>(false);
// settimeout timer
let timer: number | undefined;

// reset
const handleReset = throttle(() => {
  clearTimeout(timer);
  isRotate.value = true;
  timer = setTimeout(() => {
    isRotate.value = false;
  }, 300) as unknown as number;
  emit("reset");
}, 300);

// expose
defineExpose<McTitleToolbarInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
