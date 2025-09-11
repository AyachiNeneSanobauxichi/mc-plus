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
    req
  );
};

// download file
const downloadFile = async ({ fileId }: IDownloadFileReq) => {
  return await http.get<IDownloadFileReq, IDownloadFileResp>(
    `/auth/file/download?fileId=${fileId}`
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
