<template>
  <div class="container">
    <div class="show-value">
      <span>Value: {{ form }}</span>
    </div>
    <div>
      <mc-form :model="form">
        <mc-form-item label="Name" prop="name"> </mc-form-item>
        <mc-form-item label="Password" prop="password"> </mc-form-item>
        <mc-form-item label="Email" prop="email"> </mc-form-item>
      </mc-form>
    </div>
    <div class="tool-bar">
      <mc-button @click="changeDisabled">Change disabled</mc-button>
      <!-- <mc-button @click="handleSetValue">Set Value</mc-button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { McButton } from "mc-plus";
import McForm from "../../components/mc-form/mc-form.vue";
import McFormItem from "../../components/mc-form/mc-form-item.vue";

const form = ref<{
  name: string;
  password: string;
  email: string;
}>({
  name: "",
  password: "",
  email: "",
});

// const handleSetValue = () => {
//   selectValue.value = "1";
// };

const disabled = ref<boolean>(false);

const changeDisabled = () => {
  disabled.value = !disabled.value;
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 800px;
  padding: 200px;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;

  .content {
    width: 320px;
    background-color: pink;
  }

  .show-value {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .tool-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    position: absolute;
    bottom: 0;
  }
}

.currency-option {
  height: 50px;
  display: flex;
  align-items: center;
  gap: 4px;

  img {
    width: 24px;
    height: 24px;
    border-radius: 100%;
  }

  .currency-option-content-name {
    font-weight: 700;
    color: #222;
    font-size: 14px;
  }

  .currency-option-content-desc {
    color: #808080;
    font-size: 12px;
  }
}
</style>
