import { readdirSync } from "fs";
import { filter, map } from "lodash-es";

// get all directories in packages/components
function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}

export { getDirectoriesSync };
