/*
 * @Author: Tieju yang
 * @Date: 2025-05-26 16:00:00
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-26 16:00:00
 */
import type { FormInstance, FormRules } from "@mc-plus/components/mc-form/types";
import { ref } from "vue";

export interface FormData {
  name: string;
  password: string;
  email: string;
  recurring: boolean;
}

export function useFormDemo() {
  const formRef = ref<FormInstance>();
  const disabled = ref(false);

  // 表单数据
  const form = ref<FormData>({
    name: "HirasawaYui",
    password: "123456",
    email: "yui@gmail.com",
    recurring: false,
  });

  // 表单验证规则
  const rules = ref<FormRules>({
    name: [{ required: true, message: "请输入姓名" }],
    password: [
      {
        required: true,
        validator: (_, value, callback) => {
          if (value.length < 6) {
            callback(new Error("密码长度不能小于6位"));
          } else {
            callback();
          }
        },
      },
    ],
    email: [
      { required: true, message: "请输入邮箱" },
      { type: "email", message: "请输入正确的邮箱格式" },
    ],
    recurring: [{ required: true, message: "请选择是否定期订阅" }],
  });

  // 表单验证
  const handleValidate = async () => {
    try {
      await formRef.value?.validate();
      console.log("表单验证通过");
    } catch (error) {
      console.log("表单验证失败:", error);
    }
  };

  // 清除验证
  const handleClearValidate = () => {
    formRef.value?.clearValidate();
  };

  // 重置表单
  const handleResetFields = () => {
    formRef.value?.resetFields();
  };

  // 切换禁用状态
  const toggleDisabled = () => {
    disabled.value = !disabled.value;
  };

  return {
    formRef,
    form,
    rules,
    disabled,
    handleValidate,
    handleClearValidate,
    handleResetFields,
    toggleDisabled,
  };
}
