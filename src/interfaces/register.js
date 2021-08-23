import { getInterfaces } from './index';

const { interfacesRaw } = getInterfaces();

export async function registerInterfaces(app) {
  const interfaceModules = import.meta.globEager('./*/**/index.js');

  const interfaces = Object.values(interfaceModules).map((module) => module.default);

  interfacesRaw.value = interfaces;

  interfacesRaw.value.forEach((inter) => {
    app.component('interface-' + inter.id, inter.component);

    if (typeof inter.options !== 'function' && Array.isArray(inter.options) === false && inter.options !== null) {
      app.component(`interface-options-${inter.id}`, inter.options);
    }
  });
}
