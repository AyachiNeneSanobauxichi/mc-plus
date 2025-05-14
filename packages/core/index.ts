import { makeInstaller } from "@mc-plus/utils";
import components from "./components";
import { printLogo } from "@mc-plus/utils";
import "@mc-plus/theme/index.css";

printLogo();
const installer = makeInstaller(components);

export * from "@mc-plus/components";
export default installer;
