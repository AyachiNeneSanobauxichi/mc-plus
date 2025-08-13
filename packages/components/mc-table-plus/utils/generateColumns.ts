import type { Component, VNode, VNodeNormalizedChildren } from "vue";
import type { McTableColumnProps } from "../types";
import { isArray } from "lodash-es";
import { MC_TABLE_COLUMN } from "../constant";

// generate columns
const generateColumns = (
  children?: VNodeNormalizedChildren
): McTableColumnProps[] => {
  // columns
  const _columns: McTableColumnProps[] = [];

  // flatten nodes
  const _flattenNodes = (children?: VNodeNormalizedChildren) => {
    if (!isArray(children)) return;
    (children as VNode[]).forEach((item) => {
      const name = ((item?.type || {}) as Component)?.name;
      if (name === MC_TABLE_COLUMN) {
        _columns.push(item.props as McTableColumnProps);
      } else if (Array.isArray(item.children)) {
        _flattenNodes(item.children);
      }
    });
  };

  _flattenNodes(children);

  return _columns;
};

export default generateColumns;
