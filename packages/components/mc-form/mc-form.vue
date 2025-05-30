<template>
  <div class="mc-form">
    <form>
      <slot></slot>
    </form>
  </div>
</template>

<script setup lang="ts">
import type {
  FormContext,
  FormEmits,
  FormInstance,
  FormItemContext,
  FormProps,
  FormValidateCallback,
} from "./types";
import { each, filter, includes, keys, size } from "lodash-es";
import type { ValidateFieldsError } from "async-validator";
import { provide, reactive, toRefs } from "vue";
import { FORM_CTX_KEY } from "./constanst";

// options
defineOptions({
  name: "McForm",
});

// props
const props = withDefaults(defineProps<FormProps>(), {
  rules: () => ({}),
});

// emit
const emits = defineEmits<FormEmits>();

// fields
const fields: FormItemContext[] = [];

// add form item
const addField = (field: FormItemContext) => {
  if (!field.prop) return;
  fields.push(field);
};

// remove form item
const removeField = (field: FormItemContext) => {
  if (!field.prop) return;
  fields.splice(fields.indexOf(field), 1);
};

// handle validate
const handleValidate = async (fields: FormItemContext[] = []) => {
  let validationErrors: ValidateFieldsError = {};

  for (const field of fields) {
    try {
      await field.validate();
    } catch (error) {
      validationErrors = {
        ...validationErrors,
        ...(error as ValidateFieldsError),
      };
    }
  }

  if (!size(keys(validationErrors))) return true;
  return Promise.reject(validationErrors);
};

// validate field
const validateField = async (
  keys: string[] = [],
  callback?: FormValidateCallback
) => {
  // validate fields
  const validateFields = size(keys)
    ? filter(fields, (field) => includes(keys, field.prop))
    : fields;

  // validate
  try {
    const result = await handleValidate(validateFields);
    if (result === true) {
      callback?.(true);
    }
    return result;
  } catch (error) {
    if (error instanceof Error) throw error;
    const invalidFields = error as ValidateFieldsError;

    callback?.(false, invalidFields);
    return Promise.reject(invalidFields);
  }
};

// validate
const validate = async (callback?: FormValidateCallback) => {
  return await validateField([], callback);
};

// get fields by props
const getFieldsByProps = (fields: FormItemContext[], props: string[]) => {
  return size(props)
    ? filter(fields, (field) => includes(props, field.prop))
    : fields;
};

// reset fields
const resetFields = (keys: string[] = []) => {
  each(getFieldsByProps(fields, keys), (field) => field.resetField());
};

// clear validate
const clearValidate = (keys: string[] = []) => {
  each(getFieldsByProps(fields, keys), (field) => field.clearValidate());
};

// form context
const formContext = reactive({
  ...toRefs(props),
  emits,
  addField,
  removeField,
});

// provide
provide<FormContext>(FORM_CTX_KEY, formContext);

// expose
defineExpose<FormInstance>({
  validate,
  validateField,
  resetFields,
  clearValidate,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-form.scss";
</style>
