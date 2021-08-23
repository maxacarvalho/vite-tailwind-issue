import { getDisplays } from './index';

const { displaysRaw } = getDisplays();

export async function registerDisplays(app) {
  const displayModules = import.meta.globEager('./*/**/index.js');

  const displays = Object.values(displayModules).map((module) => module.default);

  displaysRaw.value = displays;

  displaysRaw.value.forEach((display) => {
    if (typeof display.handler !== 'function') {
      app.component('display-' + display.id, display.handler);
    }

    if (typeof display.options !== 'function' && display.options !== null) {
      app.component('display-options-' + display.id, display.options);
    }
  });
}
