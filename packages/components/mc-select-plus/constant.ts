import type { InjectionKey } from "vue";
import type { SelectPlusContext } from "./types";

export const MC_SELECT_GROUP = "McSelectGroupPlus";
export const MC_SELECT_OPTION = "McSelectOptionPlus";
export const MC_SELECT_MULTI_OPTION = "McSelectMultiOption";
export const MC_SELECT = "McSelectPlus";

export const SELECT_INJECTION_KEY: InjectionKey<SelectPlusContext> =
  Symbol("SelectPlusContext");
