import { getLayouts } from './index';

const { layoutsRaw } = getLayouts();

export async function registerLayouts(app) {
  const layoutModules = import.meta.globEager('./*/**/index.js');

  const layouts = Object.values(layoutModules).map((module) => module.default);

  layoutsRaw.value = layouts;

  layoutsRaw.value.forEach((layout) => {
    app.component('layout-' + layout.id, layout.component);
    app.component('layout-options-' + layout.id, layout.slots.options);
    app.component('layout-sidebar-' + layout.id, layout.slots.sidebar);
    app.component('layout-actions-' + layout.id, layout.slots.actions);
  });
}
