<template>
  <div class="mc-form">
    <form @submit.prevent>
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
import type { ValidateFieldsError } from "async-validator";
import { each, filter, first, includes, keys, size } from "lodash-es";
import { provide, reactive, toRefs, watchEffect } from "vue";
import { FORM_CTX_KEY } from "./constanst";

// options
defineOptions({ name: "McForm" });

// props
const props = withDefaults(defineProps<FormProps>(), {
  rules: () => ({}),
  direction: "vertical",
  scrollToError: false,
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
  let validationErrors: ValidateFieldsError[] = [];

  for (const field of fields) {
    try {
      await field.validate();
    } catch (error) {
      validationErrors.push(error as ValidateFieldsError);
    }
  }

  if (!size(validationErrors)) return true;
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
  try {
    return await validateField([], callback);
  } catch (error) {
    if (props.scrollToError) {
      scrollToError(error as ValidateFieldsError[]);
    }
    return Promise.reject(error);
  }
};

// scroll to error
const scrollToError = (error: ValidateFieldsError[]) => {
  const firstErrorProp = keys(first(error))[0];
  const firstErrorField = getFieldsByProps(fields, [firstErrorProp]);
  const firstErrorFieldId = firstErrorField[0].id;
  const firstErrorFieldElement = document.getElementById(firstErrorFieldId);
  firstErrorFieldElement?.scrollIntoView({ behavior: "smooth" });
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

// text
watchEffect(() => {
  console.log("Fields: ", fields);
});
</script>

<style scoped lang="scss">
@use "./styles/mc-form.scss";
</style>
