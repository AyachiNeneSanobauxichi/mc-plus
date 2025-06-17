<template>
  <div class="form-demo">
    <div class="demo-section">
      <h3>基础表单</h3>
      <p class="demo-description">展示基本的表单组件和验证功能</p>

      <mc-form :model="form" :rules="rules" ref="formRef" :disabled="disabled">
        <mc-form-item label="姓名" prop="name">
          <mc-input v-model="form.name" placeholder="请输入您的姓名" />
        </mc-form-item>

        <mc-form-item label="密码" prop="password">
          <mc-input type="password" v-model="form.password" placeholder="请输入您的密码" />
        </mc-form-item>

        <mc-form-item label="邮箱" prop="email">
          <mc-input prefix-icon="Email" v-model="form.email" placeholder="请输入您的邮箱" />
        </mc-form-item>

        <mc-form-item label="手机号" prop="phone">
          <mc-input v-model="form.phone" placeholder="请输入您的手机号" />
        </mc-form-item>

        <mc-form-item label="定期订阅" prop="recurring">
          <mc-checkbox v-model="form.recurring">是否定期接收邮件</mc-checkbox>
        </mc-form-item>

        <mc-form-item label="性别" prop="gender">
          <mc-radio-group v-model="form.gender">
            <mc-radio value="male">男</mc-radio>
            <mc-radio value="female">女</mc-radio>
            <mc-radio value="other">其他</mc-radio>
          </mc-radio-group>
        </mc-form-item>

        <mc-form-item label="兴趣爱好" prop="hobbies">
          <mc-checkbox-group v-model="form.hobbies">
            <mc-checkbox value="reading">阅读</mc-checkbox>
            <mc-checkbox value="music">音乐</mc-checkbox>
            <mc-checkbox value="sports">运动</mc-checkbox>
            <mc-checkbox value="travel">旅行</mc-checkbox>
          </mc-checkbox-group>
        </mc-form-item>

        <mc-form-item label="城市" prop="city">
          <mc-select v-model="form.city" placeholder="请选择城市">
            <mc-select-option value="beijing" label="北京" />
            <mc-select-option value="shanghai" label="上海" />
            <mc-select-option value="guangzhou" label="广州" />
            <mc-select-option value="shenzhen" label="深圳" />
          </mc-select>
        </mc-form-item>

        <mc-form-item label="备注" prop="remark">
          <mc-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入备注信息" />
        </mc-form-item>
      </mc-form>

      <div class="form-actions">
        <mc-button @click="toggleDisabled" :type="disabled ? 'primary' : 'plain'"> {{ disabled ? "启用" : "禁用" }}表单 </mc-button>
        <mc-button @click="handleValidate" type="primary">验证表单</mc-button>
        <mc-button @click="handleClearValidate">清除验证</mc-button>
        <mc-button @click="handleResetFields">重置表单</mc-button>
      </div>
    </div>

    <div class="demo-section">
      <h3>表单数据预览</h3>
      <div class="preview-data">
        <div class="preview-item">
          <span class="label">表单数据:</span>
          <pre>{{ JSON.stringify(form, null, 2) }}</pre>
        </div>
        <div class="preview-item">
          <span class="label">禁用状态:</span>
          <span :class="['status', disabled ? 'disabled' : 'enabled']">
            {{ disabled ? "已禁用" : "已启用" }}
          </span>
        </div>
        <div class="preview-item">
          <span class="label">验证状态:</span>
          <span :class="['status', validationStatus]">
            {{ validationStatus === "valid" ? "验证通过" : validationStatus === "invalid" ? "验证失败" : "未验证" }}
          </span>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>高级表单示例</h3>
      <p class="demo-description">展示带输入组、文件上传等高级功能的表单</p>

      <mc-form :model="advancedForm" ref="advancedFormRef">
        <mc-form-item label="金额" prop="amount">
          <mc-input-group>
            <mc-input v-model="advancedForm.amount" placeholder="请输入金额" />
            <mc-select v-model="advancedForm.currency" style="width: 100px">
              <mc-select-option value="CNY" label="CNY" />
              <mc-select-option value="USD" label="USD" />
              <mc-select-option value="EUR" label="EUR" />
            </mc-select>
          </mc-input-group>
        </mc-form-item>

        <mc-form-item label="文件上传" prop="files">
          <mc-upload v-model="advancedForm.files" :limit="3" accept=".jpg,.png,.pdf" @change="handleFileChange">
            <mc-button type="primary">选择文件</mc-button>
          </mc-upload>
        </mc-form-item>

        <mc-form-item label="开关" prop="enabled">
          <mc-switch v-model="advancedForm.enabled" />
        </mc-form-item>
      </mc-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { McButton, McCheckbox, McCheckboxGroup, McForm, McFormItem, McInput, McRadio, McRadioGroup, McSelect, McSelectOption, McSwitch, McUpload } from "@mc-plus/components";
import type { FormInstance, FormRules } from "@mc-plus/components/mc-form/types";
import { reactive, ref } from "vue";

const formRef = ref<FormInstance>();
const advancedFormRef = ref<FormInstance>();
const disabled = ref(false);
const validationStatus = ref<"valid" | "invalid" | "none">("none");

// 基础表单数据
const form = reactive({
  name: "张三",
  password: "123456",
  email: "zhangsan@example.com",
  phone: "13800138000",
  recurring: true,
  gender: "male",
  hobbies: ["reading", "music"],
  city: "beijing",
  remark: "这是一个示例表单",
});

// 高级表单数据
const advancedForm = reactive({
  amount: "",
  currency: "CNY",
  files: [],
  enabled: true,
});

// 表单验证规则
const rules: FormRules = {
  name: [
    { required: true, message: "请输入姓名" },
    { min: 2, max: 20, message: "姓名长度在 2 到 20 个字符" },
  ],
  password: [
    { required: true, message: "请输入密码" },
    { min: 6, message: "密码长度不能少于 6 位" },
  ],
  email: [
    { required: true, message: "请输入邮箱" },
    { type: "email", message: "请输入正确的邮箱格式" },
  ],
  phone: [
    { required: true, message: "请输入手机号" },
    { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号格式" },
  ],
  recurring: [{ required: true, message: "请选择是否定期订阅" }],
  gender: [{ required: true, message: "请选择性别" }],
  hobbies: [{ required: true, message: "请选择兴趣爱好" }],
  city: [{ required: true, message: "请选择城市" }],
};

// 方法
const toggleDisabled = () => {
  disabled.value = !disabled.value;
};

const handleValidate = async () => {
  try {
    await formRef.value?.validate();
    validationStatus.value = "valid";
    console.log("表单验证通过", form);
  } catch (error) {
    validationStatus.value = "invalid";
    console.log("表单验证失败:", error);
  }
};

const handleClearValidate = () => {
  formRef.value?.clearValidate();
  validationStatus.value = "none";
};

const handleResetFields = () => {
  formRef.value?.resetFields();
  validationStatus.value = "none";
};

const handleFileChange = (files: File[]) => {
  console.log("文件变化:", files);
};
</script>

<style lang="scss" scoped>
.form-demo {
  padding: 1rem;
}

.demo-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid var(--mc-gray-200);
  border-radius: 8px;
  background: white;

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--mc-gray-900);
  }

  .demo-description {
    margin: 0 0 1.5rem 0;
    color: var(--mc-gray-600);
    font-size: 0.875rem;
  }
}

.form-actions {
  margin-top: 1.5rem;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.preview-data {
  background: var(--mc-gray-50);
  border-radius: 8px;
  padding: 1rem;

  .preview-item {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }

    .label {
      font-weight: 500;
      color: var(--mc-gray-700);
      display: block;
      margin-bottom: 0.5rem;
    }

    pre {
      background: var(--mc-gray-100);
      padding: 0.75rem;
      border-radius: 6px;
      font-size: 0.875rem;
      margin: 0;
      overflow-x: auto;
      max-height: 200px;
      overflow-y: auto;
    }

    .status {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.875rem;
      font-weight: 500;

      &.enabled {
        background: var(--mc-green-100);
        color: var(--mc-green-700);
      }

      &.disabled {
        background: var(--mc-red-100);
        color: var(--mc-red-700);
      }

      &.valid {
        background: var(--mc-green-100);
        color: var(--mc-green-700);
      }

      &.invalid {
        background: var(--mc-red-100);
        color: var(--mc-red-700);
      }

      &.none {
        background: var(--mc-gray-100);
        color: var(--mc-gray-600);
      }
    }
  }
}
</style>
