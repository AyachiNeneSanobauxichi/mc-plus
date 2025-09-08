import type { ComputedRef } from "vue";
import { has, isArray } from "lodash-es";
import { getCurrentInstance, computed } from "vue";

function useProp<T>(propName: string | string[]): ComputedRef<T | void> {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("useProp must be used within a component");
  }

  return computed(() => {
    const props = instance?.proxy?.$props as any;
    if (isArray(propName)) {
      for (const name of propName) {
        if (has(props, name)) {
          return props?.[name] as T;
        }
      }
      return void 0;
    } else {
      return props?.[propName] as T;
    }
  });
}

export default useProp;
