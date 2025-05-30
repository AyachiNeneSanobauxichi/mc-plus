<template>
  <div class="mc-form-item">
    <label
      class="mc-form-item__label"
      :class="{ 'mc-form-item__label--required': isRequired }"
      v-if="label"
    >
      {{ label }}
    </label>
    <div class="mc-form-item__content">
      <slot></slot>
    </div>
    <transition name="mc-form-item-error">
      <div class="mc-form-item__error" v-if="errorMessage">
        {{ errorMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type {
  FormItemInstance,
  FormItemProps,
  FormItemRule,
  FormItemTrigger,
  FormValidateCallback,
  FormValidateFailuer,
  ValidateStatus,
} from "./types";
import type { RuleItem } from "async-validator";
import {
  ref,
  provide,
  inject,
  computed,
  reactive,
  onMounted,
  onUnmounted,
  nextTick,
  toRefs,
  toRef,
} from "vue";
import {
  cloneDeep,
  filter,
  get,
  includes,
  isArray,
  isNil,
  keys,
  map,
  set,
  size,
  some,
} from "lodash-es";
import Schema from "async-validator";
import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from "./constanst";

// options
defineOptions({
  name: "McFormItem",
});

// porps
const props = withDefaults(defineProps<FormItemProps>(), {
  disabled: false,
  required: false,
});

// form context
const formContext = inject(FORM_CTX_KEY);

// validate status
const validateStatus = ref<ValidateStatus>("init");

// error message
const errorMessage = ref<string>("");

// get value by prop
const getValueByProp = (target?: Record<string, any>) => {
  if (target && props.prop && !isNil(get(target, props.prop))) {
    return get(target, props.prop);
  }
  return null;
};

// current value
const currentValue = computed(() => {
  const model = formContext?.model;
  return getValueByProp(model);
});

// current rules
const currentRules = computed<FormItemRule[]>(() => {
  // rules list
  const rules: FormItemRule[] = [];
  // form item rules
  if (props.rules) {
    rules.push(...props.rules);
  }
  // form rules
  const formRules = formContext?.rules;
  if (formRules && props.prop) {
    const _rules = getValueByProp(formRules);
    if (_rules) {
      rules.push(..._rules);
    }
  }

  // required
  const required = props.required;

  if (isNil(required)) {
    const requiredRules = filter(
      map(rules, (rule, i) => [rule, i]),
      (item: [FormItemRule, number]) => includes(keys(item[0]), "required")
    );
    if (size(requiredRules)) {
      for (const item of requiredRules) {
        const [rule, index] = item as [FormItemRule, number];
        if (rule.required === required) continue;
        rules[index] = { ...rule, required };
      }
    } else {
      // add required rule
      rules.push({ required });
    }
  }

  return rules;
});

// validate enabled
const validateEnabled = computed(() => size(currentRules.value) > 0);

// required
const isRequired = computed(
  () => some(currentRules.value, "required") || props.required
);

// disabled
const isDisabled = computed(() => props.disabled);

// initial value
let initialValue: any = null;

// resetting flag
let isResetting: boolean = false;
// get trigger rules
const getTriggerRules = (trigger?: string) => {
  const rules = currentRules.value;
  if (rules) {
    return filter(rules, (rule) => {
      if (!rule.trigger || !trigger) return true;
      if (isArray(rule.trigger)) {
        return includes(rule.trigger, trigger);
      }
      return rule.trigger === trigger;
    }).map(({ trigger, ...rule }) => rule as RuleItem);
  }

  return [];
};

// get form item validate function
const getFormItemValidateFunc = (rules: RuleItem[]) => {
  // model name
  const modelName = props.prop;
  if (!modelName) return null;
  // validator
  const validator = new Schema({ [modelName]: rules });

  // validate function
  return validator
    .validate({ [modelName]: currentValue.value }, { firstFields: true })
    .then(() => {
      // validate success
      validateStatus.value = "success";
      formContext?.emits("validate", props, true, "");
      errorMessage.value = "";

      return true;
    })
    .catch((err: FormValidateFailuer) => {
      // validate error
      const { errors } = err;
      validateStatus.value = "error";
      errorMessage.value =
        errors && size(errors) > 0 ? errors[0].message ?? "" : "";
      formContext?.emits("validate", props, false, errorMessage.value);

      return Promise.reject(errors);
    });
};

// handle validate
const handleValidate = (
  trigger?: FormItemTrigger,
  callback?: FormValidateCallback
) => {
  // resetting || prop not exist || disabled
  if (isResetting || !props.prop || isDisabled.value)
    return Promise.reject(false);
  // rules not exist
  if (!validateEnabled.value) {
    callback?.(false);
    return Promise.reject(false);
  }

  // rules
  const rules = getTriggerRules(trigger);
  // current trigger rules not exist
  if (!size(rules)) {
    callback?.(true);
    return Promise.resolve(true);
  }

  // start validate
  validateStatus.value = "validating";
  const validateFunc = getFormItemValidateFunc(rules);

  if (validateFunc) {
    return validateFunc
      .then(() => {
        callback?.(true);
        return true;
      })
      .catch((err: FormValidateFailuer) => {
        const { fields } = err;
        callback?.(false, fields);
        return Promise.reject(fields);
      });
  } else {
    return Promise.reject(false);
  }
};

// reset field
const resetField = () => {
  const model = formContext?.model;
  if (model && props.prop && !isNil(get(model, props.prop))) {
    isResetting = true;
    set(model, props.prop, cloneDeep(initialValue));
  }

  // clear validate
  nextTick(() => {
    clearValidate();
  });
};

// clear validate
const clearValidate = () => {
  validateStatus.value = "init";
  errorMessage.value = "";
  isResetting = false;
};

// form item context
const formItemCtx = reactive({
  ...toRefs(props),
  validateStatus: computed(() => validateStatus.value),
  disabled: isDisabled.value,
  validate: handleValidate,
  resetField,
  clearValidate,
});

// provide
provide(FORM_ITEM_CTX_KEY, formItemCtx);

// add form item
onMounted(() => {
  if (props.prop) {
    formContext?.addField(formItemCtx);
    initialValue = currentValue.value;
  }
});

// remove form item
onUnmounted(() => {
  if (props.prop) {
    formContext?.removeField(formItemCtx);
  }
});

// expose
defineExpose<FormItemInstance>({
  validateMessage: errorMessage,
  validateStatus,
  validate: handleValidate,
  resetField,
  clearValidate,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-form-item.scss";
</style>
