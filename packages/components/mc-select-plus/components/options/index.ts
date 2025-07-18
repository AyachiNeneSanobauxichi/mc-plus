import type { SetupContext } from "vue";
import type { _OptionNode, _OptionsEmits } from "../../types";
import { defineComponent } from "vue";
import { filterOptions, isSameOptions } from "../../utils";

export default defineComponent({
  name: "_Options",
  emits: ["update-options"],
  setup(_: unknown, { slots, emit }: SetupContext<_OptionsEmits>) {
    // cache options
    let cachedOptions: _OptionNode[] = [];

    return () => {
      const children = slots.default?.()!;
      const filteredOptions: _OptionNode[] = [];

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
