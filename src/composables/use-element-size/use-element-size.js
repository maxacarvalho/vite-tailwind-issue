import { notEmpty } from '@/utils/is-empty';
import { isRef, onMounted, onUnmounted, ref } from 'vue';

export default function useElementSize(target) {
  const width = ref(0);
  const height = ref(0);

  const resizeObserver = new ResizeObserver(([entry]) => {
    width.value = entry.contentRect.width;
    height.value = entry.contentRect.height;
  });

  onMounted(() => {
    const t = isRef(target) ? target.value : target;

    if (notEmpty(t)) {
      resizeObserver.observe(t);
    }
  });

  onUnmounted(() => {
    resizeObserver.disconnect();
  });

  return { width, height };
}
