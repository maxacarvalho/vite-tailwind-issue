import { shallowRef } from 'vue';

const displaysRaw = shallowRef([]);
const displays = shallowRef([]);

export function getDisplays() {
  return { displays, displaysRaw };
}
