import { onMounted, onBeforeUnmount, isRef } from 'vue';

export default function useEventListener(target, type, handler, options) {
  onMounted(() => {
    const t = isRef(target) ? target.value : target;

    t.addEventListener(type, handler, options);
  });

  onBeforeUnmount(() => {
    const t = isRef(target) ? target.value : target;

    t.removeEventListener(type, handler, options);
  });
}
