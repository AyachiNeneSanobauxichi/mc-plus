<template>
  <div class="mc-business-upload">
    <mc-upload
      ref="uploadRef"
      v-model="fileList"
      :upload-user="uploadUser"
      @upload="handleUpload"
      @preview="handlePreview"
      @delete="handleDelete"
    >
      <template #content>
        <span>Latest 3 months’ original computerized salary slips; or</span>
        <span>Latest Notice of Assessment</span>
      </template>
    </mc-upload>
  </div>
</template>

<script setup lang="ts">
import type { UploadFile } from "mc-plus";
import type { McBusinessUploadEmits, McBusinessUploadProps } from "./types";
import type { IUploadFileResp } from "../../../../apis/file/types";
import type { IResponse } from "../../../../apis";
import { ref, watch } from "vue";
import { debounce } from "lodash-es";
import { McUpload } from "mc-plus";
import { downloadFile, getFileList, uploadFile } from "../../../../apis";

// options
defineOptions({ name: "McBusinessUpload" });

// props
const props = withDefaults(defineProps<McBusinessUploadProps>(), {
  modelValue: () => [],
});

// emit
const emit = defineEmits<McBusinessUploadEmits>();

// file list
const fileList = ref<UploadFile[]>([]);

// get file detail
const getFileDetail = debounce(async () => {
  // model value is empty
  if (!props.modelValue.length) {
    fileList.value = [];
    return;
  }

  // set files detail
  const res = await getFileList({ idList: props.modelValue });
  fileList.value = res.data.fileEntityList.map((file) => ({
    fid: file.id,
    name: file.fileName,
    size: file.fileSize,
    uploadBy: file.createByUserName,
    uploadTime: file.createAt,
    status: "successed",
    progress: 100,
  }));
}, 1000);

// model value change
watch(
  () => props.modelValue,
  () => {
    getFileDetail();
  },
  {
    immediate: true,
  }
);

// handle upload
const handleUpload = async (files: UploadFile[]) => {
  // upload queue
  const uploadQueue = [];
  for (const file of files) {
    if (file.status === "loading") {
      uploadQueue.push(uploadApi(file.file));
    }
  }
  // result
  const res = await Promise.allSettled(uploadQueue);

  // result index
  let resIdx = 0;

  // file id list
  const fileIdList: number[] = [];

  // update file list
  fileList.value = files.map((file) => {
    if (file.status === "loading") {
      // new file
      let newFile = { ...file };
      if (res[resIdx].status === "fulfilled") {
        // success
        const fulfiledRes = res[resIdx] as PromiseFulfilledResult<
          IResponse<IUploadFileResp>
        >;
        newFile.fid = fulfiledRes.value.data.id;
        newFile.status = "successed";
        newFile.progress = 100;
        // add new file id
        fileIdList.push(fulfiledRes.value.data.id);
      } else {
        // failed
        const rejectedRes = res[resIdx] as PromiseRejectedResult;
        newFile.status = "failed";
        newFile.errorMessage = rejectedRes.reason.message || "Upload failed";
        newFile.progress = 100;
      }
      resIdx++;
      return newFile;
    } else if (file.status === "successed") {
      // successed
      file.fid && fileIdList.push(file.fid);
      return file;
    } else {
      return file;
    }
  });

  // update model value
  emit("update:modelValue", fileIdList);
};

// upload api
const uploadApi = async (file?: File) => {
  if (!file) return Promise.reject(new Error("File is required"));

  const formData = new FormData();
  formData.append("file", file);
  const res = await uploadFile(formData);

  return res;
};

// handle delete
const handleDelete = (file: UploadFile) => {
  const newFileIdList = props.modelValue.filter((f) => f !== file.fid);
  emit("update:modelValue", newFileIdList);
};

// handle preview
const handlePreview = async (file: UploadFile) => {
  if (!file.fid || !file.name || file.status !== "successed") return;
  const fileId = file.fid;
  const res = await downloadFile({ fileId });
  const ext = file.name.split(".")[1];
  if (["pdf", "png", "jpg", "jpeg"].includes(ext)) {
    // preview
    const type = ext === "pdf" ? "application/pdf" : "image/jpeg";
    const blobView = new Blob([res.data], { type: type });
    const imageUrl = URL.createObjectURL(blobView);
    window.open(imageUrl, "_blank");
    URL.revokeObjectURL(imageUrl);
  } else {
    // download
    const blob = new Blob([res.data]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  }
};
</script>

<style scoped lang="scss">
@use "@mc-plus/theme/mixins.scss" as mixin;

.mc-business-upload {
  width: 100%;
}
</style>
