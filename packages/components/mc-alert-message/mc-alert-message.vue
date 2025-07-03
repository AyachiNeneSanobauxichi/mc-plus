<template>
  <div
    ref="_ref"
    class="mc-alert-message"
    :class="[`mc-alert-message-${type}`]"
    :style="{ width, height, cursor: expandable ? 'pointer' : 'default' }"
    @click="handleClick"
  >
    <div class="mc-alert-message-header">
      <div class="mc-alert-message-title-container">
        <div class="mc-alert-message-icon" v-if="hasIcon">
          <slot name="icon">
            <mc-icon :name="iconName!" :size="24" />
          </slot>
        </div>
        <div
          class="mc-alert-message-title"
          :style="{
            fontSize: hasContent ? '18px' : '16px',
            fontWeight: hasContent ? '600' : '400',
          }"
        >
          <slot>{{ message }}</slot>
        </div>
      </div>
      <div class="mc-alert-message-icon-group" v-if="closable || expandable">
        <mc-icon
          name="Down-Chevron"
          :size="24"
          v-if="expandable"
          class="mc-alert-message-tool-icon mc-alert-message-tool-icon-expand"
          :style="{
            transform: isExpand ? 'rotate(180deg)' : 'rotate(0deg)',
          }"
        />
        <mc-icon
          name="Cross"
          :size="24"
          v-if="closable"
          class="mc-alert-message-tool-icon mc-alert-message-tool-icon-close"
          @click.stop="handleClose"
        />
      </div>
    </div>
    <div class="mc-alert-message-body" v-if="hasContent">
      <transition name="mc-alert-message-content-transition">
        <div
          class="mc-alert-message-content"
          :style="{ paddingLeft: hasIcon ? '48px' : '16px' }"
          v-if="isExpand"
        >
          <slot name="content">{{ content }}</slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  AlertMessageEmits,
  AlertMessageInstance,
  AlertMessageProps,
} from "./types";
import type { IconType } from "../mc-icon";
import { computed, ref, useSlots } from "vue";
import McIcon from "../mc-icon/mc-icon.vue";

// options
defineOptions({ name: "McAlertMessage" });

// props
const props = withDefaults(defineProps<AlertMessageProps>(), {
  modelValue: true,
  type: "info",
  closable: false,
  expandable: false,
  hideIcon: false,
});

// emits
const emits = defineEmits<AlertMessageEmits>();

// ref
const _ref = ref<HTMLDivElement>();

// slots
const slots = useSlots();

// has content
const hasContent = computed(() => {
  return props.content || slots.content;
});

// has icon
const hasIcon = computed(() => {
  return iconName.value || slots.icon;
});

// is expand
const _isExpand = ref<boolean>(false);
const isExpand = computed<boolean>(() => {
  if (!props.expandable) return true;
  return _isExpand.value;
});

// icon
const iconName = computed<IconType | undefined>(() => {
  if (props.hideIcon) return void 0;
  switch (props.type) {
    case "success":
      return "Accept_02";
    case "error":
      return "Error_04";
    case "warning":
      return "Error_02";
    case "info":
      return "Info_02";
    default:
      return void 0;
  }
});

// handle close
const handleClose = () => {
  emits("update:modelValue", false);
  emits("close");
};

// handle expand
const handleExpand = () => {
  _isExpand.value = !_isExpand.value;
  emits("expand", _isExpand.value);
};

// handle click
const handleClick = () => {
  emits("click");
  if (props.expandable) {
    handleExpand();
  }
};

// expose
defineExpose<AlertMessageInstance>({
  ref: _ref,
  close: handleClose,
  expand: handleExpand,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
