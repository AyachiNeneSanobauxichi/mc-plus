<!--
 * @Author: Tieju yang
 * @Date: 2025-05-22 11:01:02
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-28 10:43:26
-->
<template>
  <div class="demo-section">
    <h3>Alert Component</h3>
    <div class="demo-block-column">
      <mc-alert type="success" @close="handleClose">
        <template #title>
          <span>Success A123123123lert</span>
        </template>
        <template #description>
          <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum doloremque fugiat temporibus unde? Quas consequatur quisquam modi dolore minima, iste nihil, esse quis atque quibusdam accusamus assumenda! Debitis, deleniti deserunt?</div>
        </template>
      </mc-alert>

      <mc-alert type="info" title="Info Alert" description="This is an info alert description" @close="handleClose" />
      <mc-alert type="warning" title="Warning Alert" description="This is a warning alert description" @close="handleClose" />
      <mc-alert type="error" title="Error Alert" description="This is an error alert description" @close="handleClose" />
      <mc-alert type="success" size="small" title="Small Alert" description="This is a small alert" @close="handleClose" />
      <mc-alert type="success" size="large" title="Large Alert" description="This is a large alert" @close="handleClose" />
      <mc-alert type="info" :showIcon="false" title="No Icon Alert" description="This is an alert without icon" @close="handleClose" />
      <mc-alert type="info" :closable="false" title="Non-closable Alert" description="This is an alert that cannot be closed" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { McAlert } from "../../../components";

const handleClose = (e: MouseEvent) => {
  console.log("Alert closed", e);
};
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
}
</style>
