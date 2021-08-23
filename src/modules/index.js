import { shallowRef } from 'vue';

const modulesRaw = shallowRef([]);
const modules = shallowRef([]);

export function getModules() {
  return { modules, modulesRaw };
}
