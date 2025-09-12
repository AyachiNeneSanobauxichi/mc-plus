import type {
  IDownloadFileReq,
  IDownloadFileResp,
  IFileListReq,
  IFileListResp,
  IUploadFileReq,
  IUploadFileResp,
} from "./types";
import { http } from "../request";

// upload file
const uploadFile = async (req: IUploadFileReq) => {
  return await http.post<IUploadFileReq, IUploadFileResp>(
    "/auth/file/upload/1",
    req,
    {
      requestType: "formData",
    }
  );
};

// download file
const downloadFile = async ({ fileId }: IDownloadFileReq) => {
  return await http.get<IDownloadFileReq, IDownloadFileResp>(
    `/auth/file/download.do?fileId=${fileId}`,
    {
      responseType: "blob",
    }
  );
};

// get file list
const getFileList = async (req: IFileListReq) => {
  return await http.post<IFileListReq, IFileListResp>(
    "/auth/file/list.do",
    req
  );
};

export { uploadFile, downloadFile, getFileList };
