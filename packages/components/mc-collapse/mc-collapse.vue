<template>
  <div class="mc-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { CollapseProps, CollapseEmits, CollapseItemName } from "./types";
import { ref, provide, watch } from "vue";
import { COLLAPSE_CONTEXT_KEY } from "./constant";

// options
defineOptions({
  name: "McCollapse",
});

// props
const { accorrdion, modelValue } = defineProps<CollapseProps>();
const activeNames = ref(modelValue);

// emit
const emit = defineEmits<CollapseEmits>();

// accordion mode
if (accorrdion && modelValue.length > 1) {
  console.warn(
    "[mc-collapse]: accorrdion is true, modelValue should be a single value."
  );
}

// active names watcher
watch(
  () => modelValue,
  (newNames) => updateActiveNames(newNames)
);

// update active names
const updateActiveNames = (newNames: CollapseItemName[]) => {
  activeNames.value = newNames;
  emit("update:modelValue", newNames);
  emit("change", newNames);
};

// item click
const handleItemClick = (item: CollapseItemName) => {
  let _activeNames = [...activeNames.value];

  if (accorrdion) {
    // accordion mode
    _activeNames = [_activeNames[0] === item ? item : ""];
    updateActiveNames(_activeNames);
  } else {
    const idx = _activeNames.indexOf(item);
    if (idx > -1) {
      // open => close
      _activeNames.splice(idx, 1);
    } else {
      // close => open
      _activeNames.push(item);
    }
    updateActiveNames(_activeNames);
  }
};

// provide
provide(COLLAPSE_CONTEXT_KEY, {
  activeNames,
  handleItemClick,
});
</script>

<style scoped lang="scss">
@use "./styles/index.scss";
</style>
