import type { Component } from "vue";
import type { IconType } from "mc-plus";
import { defineAsyncComponent, ref, shallowRef } from "vue";

interface Step {
  step: string;
  label?: string;
  desc?: string;
  component?: Component;
  children?: Step[];
  icon?: IconType;
  showContent?: boolean;
  success?: boolean;
}

enum STEP_KEY {
  BASIC_INFORMATION = "1",
  UNDERSTANDING_YOUR_NEEDS = "1-1",
  PROOF_OF_IDENTITY = "1-2",
  PERSONAL_INFORMATION = "1-3",
  ACCOUNT_INFORMATION = "1-4",
  FINANCIAL_DECLARATION = "2",
  SOURCE_OF_FUNDS = "2-1",
  EXISTING_HOLDING_OF_FUNDS = "2-2",
  TAX_DECLARATION = "2-3",
  ADDITIONAL_INFORMATION = "3",
  SUMMARY = "4",
  COMPLETE = "5",
}

const useSteps = () => {
  const stepList = shallowRef<Step[]>([
    {
      step: STEP_KEY.BASIC_INFORMATION,
      label: "BASIC INFORMATION",
      component: defineAsyncComponent(() => import("../steps/step1.vue")),
      children: [
        {
          step: STEP_KEY.UNDERSTANDING_YOUR_NEEDS,
          label: "Understanding your needs",
          component: defineAsyncComponent(
            () => import("../child-steps/child-steps1.vue")
          ),
        },
        {
          step: STEP_KEY.PROOF_OF_IDENTITY,
          label: "Proof of Identity",
          component: defineAsyncComponent(
            () => import("../child-steps/child-steps2.vue")
          ),
        },
        {
          step: STEP_KEY.PERSONAL_INFORMATION,
          label: "Personal Information",
          component: defineAsyncComponent(
            () => import("../child-steps/child-steps2.vue")
          ),
        },
        {
          step: STEP_KEY.ACCOUNT_INFORMATION,
          label: "Account Information",
          component: defineAsyncComponent(
            () => import("../child-steps/child-steps2.vue")
          ),
        },
      ],
    },
    {
      step: STEP_KEY.FINANCIAL_DECLARATION,
      label: "Financial Declaration",
      children: [
        {
          step: STEP_KEY.SOURCE_OF_FUNDS,
          label: "Source of Funds",
          component: defineAsyncComponent(
            () => import("../child-steps/child-steps1.vue")
          ),
        },
        {
          step: STEP_KEY.EXISTING_HOLDING_OF_FUNDS,
          label: "Existing Holding of Funds",
          component: defineAsyncComponent(
            () => import("../child-steps/child-steps2.vue")
          ),
        },
        {
          step: STEP_KEY.TAX_DECLARATION,
          label: "Tax Declaration",
          component: defineAsyncComponent(
            () => import("../child-steps/child-steps2.vue")
          ),
        },
      ],
    },
    {
      step: STEP_KEY.ADDITIONAL_INFORMATION,
      label: "Additional Information",
      component: defineAsyncComponent(() => import("../steps/step3.vue")),
    },
    {
      step: STEP_KEY.SUMMARY,
      label: "Summary",
      component: defineAsyncComponent(() => import("../steps/step4.vue")),
    },
    {
      step: STEP_KEY.COMPLETE,
      label: "Complete",
      component: defineAsyncComponent(() => import("../steps/step5.vue")),
    },
  ]);

  const successSteps = ref<string[]>([]);

  const currentStep = ref<string>("1-1");

  return {
    stepList,
    successSteps,
    currentStep,
  };
};

export default useSteps;
