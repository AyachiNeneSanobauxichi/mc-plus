import type { SetupContext } from "vue";
import type { _OptionsEmits } from "./types";
import type { SelectPlusValue } from "../../types";
import { defineComponent } from "vue";
import { filterOptions, isSameOptions } from "../../utils";

export default defineComponent({
  name: "_Options",
  emits: ["update-options"],
  setup(_: unknown, { slots, emit }: SetupContext<_OptionsEmits>) {
    // cache options
    let cachedOptions: SelectPlusValue[] = [];

    return () => {
      const children = slots.default?.()!;
      const filteredOptions: SelectPlusValue[] = [];

      if (children.length) {
        const newOptions = filterOptions(children![0]?.children);
        filteredOptions.push(...newOptions);
      }

      if (!isSameOptions(filteredOptions, cachedOptions)) {
        cachedOptions = filteredOptions;
        emit("update-options", filteredOptions);
      }

      return children;
    };
  },
});
