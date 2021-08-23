import { computed } from 'vue';

export default function useSync(props, key, emit) {
  return computed({
    get() {
      return props[key];
    },
    set(newVal) {
      emit(`update:${key}`, newVal);
    },
  });
}
