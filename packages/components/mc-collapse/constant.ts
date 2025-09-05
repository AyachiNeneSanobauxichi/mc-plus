import type { InjectionKey } from "vue";
import type { CollapseContext } from "./types";

export const COLLAPSE_CONTEXT_KEY: InjectionKey<CollapseContext> =
  Symbol("COLLAPSE_CONTEXT");

export const COMPONENT_NAME = "McCollapse" as const;
