type IUploadFileReq = FormData;

interface IUploadFileResp {
  id: number;
  type: string;
  fileName: string;
}

interface IDownloadFileReq {
  fileId: number;
}

type IDownloadFileResp = BlobPart;

interface IFileListReq {
  idList: number[];
}

interface IFileListResp {
  fileEntityList: FileDetail[];
}

interface FileDetail {
  id: number;
  type: string;
  fileName: string;
  createByUserName: string;
  fileSize: number;
  createAt: string;
}

export type {
  IUploadFileReq,
  IUploadFileResp,
  IDownloadFileReq,
  IDownloadFileResp,
  IFileListReq,
  IFileListResp,
  FileDetail,
};
