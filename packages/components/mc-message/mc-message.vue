<!--
 * @Author: Tieju yang
 * @Date: 2025-05-20 15:28:13
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-20 17:46:20
-->
<template>
  <transition name="mc-message-fade">
    <div v-show="visible" ref="_ref" class="mc-message" :style="style" :class="[`mc-message--${type}`]">
      <div class="mc-message__content">
        <mc-icon v-if="showIcon" :name="iconMap[type]" class="mc-message__icon"></mc-icon>
        <div class="mc-message__text">
          <div class="mc-message__title">{{ message }}</div>
          <div v-if="description" class="mc-message__description">{{ description }}</div>
        </div>
      </div>
      <mc-icon v-if="closable" name="Cross" class="mc-message__close" @click="handleClose"></mc-icon>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRefs, toValue, useAttrs } from "vue";
import McIcon from "../mc-icon/mc-icon.vue";
import type { IconType } from "../mc-icon/types";
import type { MessageEmits, MessageInstance, MessageProps } from "./types";

// options
defineOptions({
  name: "McMessage",
});

// props
const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
  message: "",
  description: "",
  duration: 3000,
  showIcon: true,
  closable: true,
});

// emits
const emit = defineEmits<MessageEmits>();

// ref
const _ref = ref<HTMLDivElement>();
const visible = ref(true);

// attrs
const attrs = toRefs(useAttrs());
// style
const style = computed(() => {
  return {
    ...toValue(attrs).style,
  };
});

// icon mapping
const iconMap: Record<string, IconType> = {
  success: "Accept_02",
  info: "Info_02",
  warning: "Error_02",
  error: "Error_04",
};

// close event
const handleClose = () => {
  visible.value = false;
  emit("close");
  props.onClose?.();
};

// auto close
onMounted(() => {
  if (props.duration > 0) {
    setTimeout(() => {
      handleClose();
    }, props.duration);
  }
});

// expose
defineExpose<MessageInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
