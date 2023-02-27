const modules = import.meta.glob("@/components/generic/*.vue", { eager: true });

export default function loadComponents(app) {
  for (const path in modules) {
    const componentName = path.split("/").at(-1).split(".")[0];
    app.component(`Gen${componentName}`, modules[path].default);
  }
}
