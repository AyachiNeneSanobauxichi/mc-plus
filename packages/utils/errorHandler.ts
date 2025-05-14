import { isString } from "lodash-es";

class McPlusError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "McPlusError";
  }
}

export function throwError(scope: string, msg: string) {
  throw new McPlusError(`[${scope}]:${msg}`);
}

export function debugWarning(err: Error): void;
export function debugWarning(scope: string, msg: string): void;
export function debugWarning(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV !== "production") {
    const err = isString(scope) ? new McPlusError(`[${scope}]:${msg}`) : scope;
    console.warn(err);
  }
}
