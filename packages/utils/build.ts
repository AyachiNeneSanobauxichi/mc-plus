import { readdirSync, readFileSync } from "fs";
import { delay, each, filter, isFunction, map } from "lodash-es";
import shell from "shelljs";

export const TRY_MOCE_STYLES_DELAY = 800 as const;

export const isProd = process.env.NODE_ENV === "production";
export const isDev = process.env.NODE_ENV === "development";
export const isTest = process.env.NODE_ENV === "test";
export const ENV = {
  isProd,
  isDev,
  isTest,
};

// get all directories in packages/components
export function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}

// remove dist
export function removeDistPlugin({
  rmFiles = [],
  beforeBuild,
  afterBuild,
}: {
  rmFiles?: string[];
  beforeBuild?: Function;
  afterBuild?: Function;
}) {
  return {
    name: "hooks-plugin",
    buildStart() {
      each(rmFiles, (fileName) => shell.rm("-rf", fileName));
      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd(err?: Error) {
      !err && isFunction(afterBuild) && afterBuild();
    },
  };
}

// move styles
export function moveStyles() {
  try {
    readFileSync("./dist/umd/index.css.gz");
    shell.cp("./dist/umd/index.css", "./dist/index.css");
  } catch (error) {
    delay(moveStyles, TRY_MOCE_STYLES_DELAY);
  }
}
