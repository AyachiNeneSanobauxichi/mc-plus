// import { useId as vueUseId } from "vue";

// generate id
export const generateId = (digit: number = 10) => {
  // const randomId = vueUseId();
  return String(Date.now()).slice(-digit);
};
