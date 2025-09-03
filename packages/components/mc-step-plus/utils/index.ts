import type { Component, Slot, VNode, VNodeNormalizedChildren } from "vue";
import type { McStepItem } from "../types";
import { isArray, isFunction, isString } from "lodash-es";
import { MC_STEP_CHILD_ITEM_PLUS, MC_STEP_ITEM_PLUS } from "../constant";

// generate step items
export const generateStepItems = (children?: VNodeNormalizedChildren) => {
  const stepItems: McStepItem[] = [];
  let parentIndex = 0;
  let index = 0;

  const flattenNodes = (
    children?: VNodeNormalizedChildren,
    parentStepItem?: McStepItem
  ) => {
    if (!isArray(children)) return;
    (children as VNode[]).forEach((item) => {
      const name = ((item?.type || {}) as Component)?.name;

      if (name === MC_STEP_ITEM_PLUS) {
        const _children =
          !isString(item.children) &&
          !isArray(item.children) &&
          isFunction(item.children?.default)
            ? item.children?.default()
            : item.children;

        const currentStep: McStepItem = {
          parentIndex: parentIndex++,
          index: index++,
          step: item.props?.step || index,
          label: item.props?.label,
          desc: item.props?.desc,
          icon: item.props?.icon,
          showContent: item.props?.showContent || item.props?.["show-content"],
          success: item.props?.success,
          content: (item.children as { default?: () => Component })
            ?.default as Slot,
        };

        stepItems.push(currentStep);
        flattenNodes(_children, currentStep);
      } else if (name === MC_STEP_CHILD_ITEM_PLUS) {
        const currentStep: McStepItem = {
          index: index++,
          step: item.props?.step,
          label: item.props?.label,
          desc: item.props?.desc,
          parentStep: parentStepItem,
          isChild: true,
          showContent: item.props?.showContent || item.props?.["show-content"],
          success: item.props?.success,
          content: (item.children as { default?: () => Component })
            ?.default as Slot,
        };

        if (parentStepItem) {
          parentStepItem.content = void 0;
          parentStepItem.hasChildren = true;
          if (!parentStepItem.children) parentStepItem.children = [];
          currentStep.childIndex = parentStepItem.children.length;
          parentStepItem.children.push(currentStep);
          if (!parentStepItem.childrenSteps) parentStepItem.childrenSteps = [];
          parentStepItem.childrenSteps.push(currentStep.step);
        }

        stepItems.push(currentStep);
      } else if (Array.isArray(item.children)) {
        flattenNodes(item.children, parentStepItem);
      }
    });
  };

  flattenNodes(children);

  return stepItems;
};
