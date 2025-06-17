<template>
  <div class="demo-section">
    <h3>Collapse Component</h3>

    <h4>Basic Collapse</h4>
    <div class="demo-block-column">
      <mc-collapse v-model="activeNames">
        <mc-collapse-item name="1" title="Collapse Item 1">
          <div>This is the content for collapse item 1.</div>
          <div>You can put any content here, including other components.</div>
        </mc-collapse-item>
        <mc-collapse-item name="2" title="Collapse Item 2">
          <div>This is the content for collapse item 2.</div>
        </mc-collapse-item>
        <mc-collapse-item name="3" title="Collapse Item 3">
          <div>This is the content for collapse item 3.</div>
        </mc-collapse-item>
      </mc-collapse>
      <div>Active items: {{ activeNames }}</div>
    </div>

    <h4>Accordion Mode</h4>
    <div class="demo-block-column">
      <mc-collapse v-model="activeAccordion" accordion>
        <mc-collapse-item name="1" title="Accordion Item 1">
          <div>This is the content for accordion item 1.</div>
        </mc-collapse-item>
        <mc-collapse-item name="2" title="Accordion Item 2">
          <div>This is the content for accordion item 2.</div>
        </mc-collapse-item>
        <mc-collapse-item name="3" title="Accordion Item 3">
          <div>This is the content for accordion item 3.</div>
        </mc-collapse-item>
      </mc-collapse>
    </div>

    <h4>Custom Title</h4>
    <div class="demo-block-column">
      <mc-collapse v-model="activeCustom">
        <mc-collapse-item name="1">
          <template #title>
            <div class="custom-title">
              <mc-icon name="Info" />
              <span>Custom Title with Icon</span>
            </div>
          </template>
          <div>This collapse item has a custom title with an icon.</div>
        </mc-collapse-item>
        <mc-collapse-item name="2">
          <template #title>
            <div class="custom-title">
              <mc-icon name="Setting" />
              <span>Settings</span>
            </div>
          </template>
          <div>This is the settings panel content.</div>
        </mc-collapse-item>
      </mc-collapse>
    </div>

    <h4>Disabled Item</h4>
    <div class="demo-block-column">
      <mc-collapse v-model="activeDisabled">
        <mc-collapse-item name="1" title="Enabled Item">
          <div>This item can be collapsed and expanded.</div>
        </mc-collapse-item>
        <mc-collapse-item name="2" title="Disabled Item" disabled>
          <div>This item is disabled and cannot be interacted with.</div>
        </mc-collapse-item>
      </mc-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { McCollapse, McCollapseItem, McIcon } from "mc-plus";
import { ref } from "vue";

const activeNames = ref(["1"]); // Array for multiple selection
const activeAccordion = ref(["1"]); // Array for accordion mode too
const activeCustom = ref(["1"]);
const activeDisabled = ref(["1"]);
</script>

<style scoped lang="scss">
.demo-section {
  margin-bottom: 32px;
}

.demo-block-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
  margin-bottom: 24px;
}

h4 {
  margin-top: 16px;
  margin-bottom: 0;
  font-size: 16px;
  font-weight: bold;
}

.custom-title {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
