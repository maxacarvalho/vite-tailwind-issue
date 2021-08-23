import { shallowRef } from 'vue';

const layoutsRaw = shallowRef([]);
const layouts = shallowRef([]);

export function getLayouts() {
  return { layouts, layoutsRaw };
}
