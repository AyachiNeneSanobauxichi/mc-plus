import type { UploadLang } from "../types";
import { computed } from "vue";
import { UPLOAD_TEXT_EH, UPLOAD_TEXT_ZH } from "../lang";

const useLang = (lang: UploadLang) => {
  const langMap = computed(() => {
    return lang === "zh" ? UPLOAD_TEXT_ZH : UPLOAD_TEXT_EH;
  });

  return {
    langMap,
  };
};

export default useLang;
