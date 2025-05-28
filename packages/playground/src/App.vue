<template>
  <div class="container">
    <div class="show-value">
      <span>Value: {{ form }}</span>
    </div>
    <div>
      <mc-form :model="form" :rules="rules" ref="formRef">
        <mc-form-item label="Name" prop="name">
          <mc-input v-model="form.name" placeholder="Please enter your name" />
        </mc-form-item>
        <mc-form-item label="Password" prop="password">
          <mc-input
            v-model="form.password"
            placeholder="Please enter your password"
          />
        </mc-form-item>
        <mc-form-item label="Email" prop="email">
          <mc-input
            v-model="form.email"
            placeholder="Please enter your email"
          />
        </mc-form-item>
      </mc-form>
    </div>
    <div class="tool-bar">
      <mc-button @click="changeDisabled">Change disabled</mc-button>
      <mc-button @click="handleValidate">Validate</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { McButton, McInput } from "mc-plus";
import McForm from "../../components/mc-form/mc-form.vue";
import McFormItem from "../../components/mc-form/mc-form-item.vue";
import type {
  FormRules,
  FormInstance,
} from "@mc-plus/components/mc-form/types";

const form = ref<{
  name: string;
  password: string;
  email: string;
}>({
  name: "",
  password: "",
  email: "",
});

const formRef = ref<FormInstance>();

const rules = ref<FormRules>({
  name: [{ required: true, message: "名字不对好好填" }],
  password: [
    {
      required: true,
      validator: (_, value, callback) => {
        if (value === "给我报错" || !value) {
          callback(new Error("你要报错啊"));
        } else {
          callback();
        }
      },
    },
  ],
  email: [{ required: true, message: "填的什么玩意" }],
});

const handleValidate = async () => {
  try {
    await formRef.value?.validate();
  } catch (error) {
    console.log("Error: ", error);
  }
};

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
