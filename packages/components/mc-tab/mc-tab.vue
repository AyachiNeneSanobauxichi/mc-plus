<template>
  <div class="mc-tab" :class="`mc-tab-${type}`" ref="_ref">
    <div class="mc-tab-nav" ref="tabNavRef">
      <div
        class="mc-tab-nav-item"
        :class="{
          'mc-tab-nav-item-active': tab.name === modelValue,
          'mc-tab-nav-item-disabled': tab.disabled,
        }"
        v-for="tab in tabItems"
        :key="tab.name"
        @click="handleTabClick(tab.name)"
      >
        {{ tab.label }}
      </div>
      <div class="mc-tab-line" ref="tabLineRef" v-if="type === 'plain'"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TabEmits, TabInstance, TabItem, TabProps } from "./types";
import { ref } from "vue";
import { findIndex } from "lodash-es";

// options
defineOptions({ name: "McTabItem" });

// props
const props = withDefaults(defineProps<TabProps>(), {
  type: "plain",
});

// emit
const emit = defineEmits<TabEmits>();

// refs
const _ref = ref<HTMLDivElement | void>();
const tabNavRef = ref<HTMLDivElement | void>();
const tabLineRef = ref<HTMLDivElement | void>();

// tab items
const tabItems = ref<TabItem[]>([
  { name: "tab-1", label: "Tab 1" },
  { name: "tab-2", label: "Tab 2" },
  { name: "tab-3", label: "Tab 3" },
  { name: "tab-4", label: "Tab 4" },
  { name: "tab-5", label: "Tab 5" },
]);

// click tab
const handleTabClick = (tabName: string) => {
  emit("update:modelValue", tabName);
  emit("change", tabName);
};

// set active tab line
const setTabLine = () => {
  const line = tabLineRef.value!;
  const navContainer = tabNavRef.value!;

  const activeTabIdx = findIndex(
    tabItems.value,
    (item) => item.name === props.modelValue
  );

  if (activeTabIdx >= 0) {
    line.style.width = "0";
    return;
  }

  const tabItemNodes = Array.from(navContainer.children);
  const activeTabItem = tabItemNodes[activeTabIdx];
};

// expose
defineExpose<TabInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-tab.scss";
</style>
