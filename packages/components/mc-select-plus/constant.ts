import type { InjectionKey } from "vue";
import type { SelectPlusContext } from "./types";

export const MC_SELECT_OPTION_GROUP = "McOptionGroupPlus";
export const MC_SELECT_OPTION = "McOptionPlus";
export const MC_SELECT = "McSelectPlus";

export const SELECT_INJECTION_KEY: InjectionKey<SelectPlusContext> =
  Symbol("SelectPlusContext");
