import type { Component, Slot, VNode, VNodeNormalizedChildren } from "vue";
import type { McStepItem, McStepKey } from "../types";
import { isArray, isFunction, isString } from "lodash-es";
import { MC_STEP_CHILD_ITEM_PLUS, MC_STEP_ITEM_PLUS } from "../constant";

// generate step items
export const generateStepItems = (children?: VNodeNormalizedChildren) => {
  const stepItems: McStepItem[] = [];

  const flattenNodes = (
    children?: VNodeNormalizedChildren,
    parentKey?: McStepKey
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

        stepItems.push({
          step: item.props?.step,
          label: item.props?.label,
          desc: item.props?.desc,
          parentKey: parentKey,
        });
        flattenNodes(_children, item.props?.step);
      } else if (name === MC_STEP_CHILD_ITEM_PLUS) {
        stepItems.push({
          step: item.props?.step,
          label: item.props?.label,
          desc: item.props?.desc,
          parentKey: parentKey,
          context: (item.children as { default?: () => Component })
            ?.default as Slot,
        });
      } else if (Array.isArray(item.children)) {
        flattenNodes(item.children, parentKey);
      }
    });
  };

  flattenNodes(children);

  return stepItems;
};
