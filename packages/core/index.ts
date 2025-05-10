import { makeInstaller } from "@mc-plus/utils";
import components from "./components";
import "@mc-plus/theme/index.css";

const installer = makeInstaller(components);

export * from "../components";
export default installer;
