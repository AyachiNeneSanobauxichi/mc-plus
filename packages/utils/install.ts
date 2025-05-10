import type { App, Plugin } from "vue";
import { each } from "lodash-es";

type SFCWithInstall<T> = T & Plugin;

type ComponentWithName = {
  name: string;
  [key: string]: any;
};

// bulk installation
export const makeInstaller = (components: Plugin[]) => {
  const installer = (app: App) => each(components, (c) => app.use(c));

  return installer as Plugin;
};

// individual installation support
export const withInstall = <T extends ComponentWithName>(component: T) => {
  (component as SFCWithInstall<T>).install = (app: App) => {
    app.component(component.name, component);
  };

  return component as SFCWithInstall<T>;
};
