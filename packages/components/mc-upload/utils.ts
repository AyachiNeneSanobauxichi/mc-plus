import type { UploadFile } from "./types";

enum SIZE_ENUM {
  B = "B",
  KB = "KB",
  MB = "MB",
  GB = "GB",
}

const UNIT = 1024;

// format number
const formatNumber = (numStr: string) => {
  return parseFloat(numStr).toString();
};

// get file size
const getFileSize = (size: number, fraction: number = 2) => {
  if (size < UNIT) {
    return `${size} ${SIZE_ENUM.B}`;
  } else if (size < UNIT * UNIT) {
    return `${formatNumber((size / UNIT).toFixed(fraction))} ${SIZE_ENUM.KB}`;
  } else if (size < UNIT * UNIT * UNIT) {
    return `${formatNumber((size / (UNIT * UNIT)).toFixed(fraction))} ${
      SIZE_ENUM.MB
    }`;
  } else {
    return `${formatNumber((size / (UNIT * UNIT * UNIT)).toFixed(fraction))} ${
      SIZE_ENUM.GB
    }`;
  }
};

// change size string to number
const changeSizeStringToNumber = (size: string) => {
  try {
    if (!size || !size.includes(" ")) throw new Error();
    const sizeArray = size.split(" ");
    if (sizeArray.length !== 2) throw new Error();
    const sizeValue = Number(sizeArray[0]);
    const sizeUnit = sizeArray[1];

    if (!(sizeUnit in SIZE_ENUM)) {
      throw new Error();
    }

    if (sizeUnit === SIZE_ENUM.B) {
      return sizeValue;
    } else if (sizeUnit === SIZE_ENUM.KB) {
      return sizeValue * UNIT;
    } else if (sizeUnit === SIZE_ENUM.MB) {
      return sizeValue * UNIT * UNIT;
    } else if (sizeUnit === SIZE_ENUM.GB) {
      return sizeValue * UNIT * UNIT * UNIT;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error("Please config the correct file size. ", error);
    return -1;
  }
};

// format date
const formatDate = (timestamp?: number | string): string => {
  if (!timestamp) return "--";

  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};

// update file status
const updateFileStatus = (
  uploadFileMap: Map<string, UploadFile>,
  fileName: string,
  newFile: UploadFile
) => {
  const file = uploadFileMap.get(fileName);
  uploadFileMap.set(fileName, {
    ...file,
    ...newFile,
  });
};

export { getFileSize, changeSizeStringToNumber, formatDate, updateFileStatus };
