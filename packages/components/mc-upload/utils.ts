enum SIZE_ENUM {
  B = "B",
  KB = "KB",
  MB = "MB",
  GB = "GB",
}

const UNIT = 1024;

const formatNumber = (numStr: string) => {
  return parseFloat(numStr).toString();
};

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

export { getFileSize, changeSizeStringToNumber };
