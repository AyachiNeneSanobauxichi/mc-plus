import { WILDCARD } from "../constant";

const UPLOAD_TEXT_ZH = {
  upload_note: "单击即可上传或将文件拖放到此处",
  max_size: "最大文件大小：",
  max_count:
    "No limit on maximum number of documents but recommend that upload then in pdf if more than 5 files are to be upload.",
  uploaded_by: "上传用户",
  uploaded_on: "上传时间",
  limit_count: `文件数量不能超过 ${WILDCARD} 。`,
  limit_size: `最大文件大小：${WILDCARD} 。`,
  limit_type: `只接受文件格式：${WILDCARD}`,
};

export default UPLOAD_TEXT_ZH;
