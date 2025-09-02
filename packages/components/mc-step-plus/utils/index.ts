import type { Component, Slot, VNode, VNodeNormalizedChildren } from "vue";
import type { McStepItem } from "../types";
import { isArray, isFunction, isString } from "lodash-es";
import { MC_STEP_CHILD_ITEM_PLUS, MC_STEP_ITEM_PLUS } from "../constant";

// generate step items
export const generateStepItems = (children?: VNodeNormalizedChildren) => {
  const stepItems: McStepItem[] = [];
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
          index: index++,
          step: item.props?.step || index,
          label: item.props?.label,
          desc: item.props?.desc,
          content: (item.children as { default?: () => Component })
            ?.default as Slot,
        };

        stepItems.push(currentStep);
        flattenNodes(_children, currentStep);
      } else if (name === MC_STEP_CHILD_ITEM_PLUS) {
        if (parentStepItem) {
          parentStepItem.content = void 0;
          parentStepItem.hasChildren = true;
        }
        stepItems.push({
          step: item.props?.step,
          label: item.props?.label,
          desc: item.props?.desc,
          parentStep: parentStepItem?.step,
          isChild: true,
          content: (item.children as { default?: () => Component })
            ?.default as Slot,
        });
      } else if (Array.isArray(item.children)) {
        flattenNodes(item.children, parentStepItem);
      }
    });
  };

  flattenNodes(children);

  return stepItems;
};
