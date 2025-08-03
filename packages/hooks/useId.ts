import { useId as vueUseId } from "vue";
import useProp from "./useProp";

// use id hook
const useId = (key?: string) => {
  const componentId = useProp<string>("id");
  if (componentId.value) {
    return componentId.value;
  } else {
    const randomId = vueUseId();
    const id = key ? `${key}-${randomId}` : randomId;
    return id;
  }
};

export default useId;
