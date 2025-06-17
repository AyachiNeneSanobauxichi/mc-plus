import { includes } from "lodash-es";

// currency formatter
export const currencyFormatter = (value: string) => {
  value = value.toString();
  const [_int, _desc] = value.toString().split(".");
  // 正向预查（?=）数字后出现三位一组的捕获组 1 次或多次
  // 第一个捕获组($1)即单个数字加 ','
  const int = _int.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  if (includes(value, ".")) {
    return `${int}.${_desc}`;
  } else {
    return int;
  }
};

// currency parser
export const currencyParser = (value: string, accuracy: number = 8) => {
  // 非捕获组（?: 会被匹配但不会被捕获提升性能）
  value = value.replace(/(?:[^0-9.]+)/g, "");
  // 整数 和 若干小数点的集合
  const [_int, ..._desc] = value.split(".");
  if (_desc.length) {
    // 除去剩余小数点
    const desc = _desc.join("");
    return `${_int}.${desc.substring(0, accuracy)}`;
  } else {
    return _int;
  }
};
