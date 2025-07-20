import type { Component, VNode, VNodeNormalizedChildren } from "vue";
import type { _OptionNode } from "../types";
import { isArray, isFunction, isString } from "lodash-es";
import { MC_SELECT_OPTION, MC_SELECT_OPTION_GROUP } from "../constant";

// check if two options are the same
const isSameOptions = (
  originalOptions: _OptionNode[],
  newOptions: _OptionNode[]
): boolean => {
  if (originalOptions.length !== newOptions.length) return false;
  for (const [index] of originalOptions.entries()) {
    if (originalOptions[index] != newOptions[index]) {
      return false;
    }
  }
  return true;
};

// generate options
const generateOptions = (children?: VNodeNormalizedChildren): _OptionNode[] => {
  const optionNodes: _OptionNode[] = [];

  const flattenNodes = (children?: VNodeNormalizedChildren, group?: string) => {
    if (!isArray(children)) return;
    (children as VNode[]).forEach((item) => {
      const name = ((item?.type || {}) as Component)?.name;

      if (name === MC_SELECT_OPTION_GROUP) {
        const _children =
          !isString(item.children) &&
          !isArray(item.children) &&
          isFunction(item.children?.default)
            ? item.children?.default()
            : item.children;
        flattenNodes(_children, item.props?.label);
      } else if (name === MC_SELECT_OPTION) {
        optionNodes.push({
          label: item.props?.label,
          value: item.props?.value,
          group,
          context: (item.children as { default?: () => Component })?.default,
        });
      } else if (Array.isArray(item.children)) {
        flattenNodes(item.children, group);
      }
    });
  };

  flattenNodes(children);
  return optionNodes;
};

export { isSameOptions, generateOptions };
