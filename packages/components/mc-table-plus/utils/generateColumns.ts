import type { Component, Slots, VNode, VNodeNormalizedChildren } from "vue";
import type { McTableColumn } from "../types";
import { isArray } from "lodash-es";
import { MC_TABLE_COLUMN, MC_TABLE_DEFAULT_PROPS } from "../constant";

// generate columns
const generateColumns = (
  children?: VNodeNormalizedChildren
): McTableColumn[] => {
  // columns
  const _columns: McTableColumn[] = [];

  // flatten nodes
  const _flattenNodes = (children?: VNodeNormalizedChildren) => {
    if (!isArray(children)) return;
    (children as VNode[]).forEach((item) => {
      const name = ((item?.type || {}) as Component)?.name;
      if (name === MC_TABLE_COLUMN) {
        const slots = item.children as Slots;
        _columns.push({
          ...MC_TABLE_DEFAULT_PROPS,
          ...item.props,
          headerTitle: slots?.["header-title"],
          headerDesc: slots?.["header-desc"],
          header: slots?.["header"],
        } as McTableColumn);
      } else if (Array.isArray(item.children)) {
        _flattenNodes(item.children);
      }
    });
  };

  _flattenNodes(children);

  console.log("Columns: ", _columns);

  return _columns;
};

export default generateColumns;
