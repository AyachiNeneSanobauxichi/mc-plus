import type { UploadLang } from "../types";
import { computed } from "vue";
import { useProp } from "@mc-plus/hooks";
import { UPLOAD_TEXT_EH, UPLOAD_TEXT_ZH } from "../lang";

const useLang = () => {
  const lang = useProp<UploadLang>("lang");

  const langMap = computed(() => {
    return lang.value === "zh" ? UPLOAD_TEXT_ZH : UPLOAD_TEXT_EH;
  });

  return {
    langMap,
  };
};

export default useLang;
