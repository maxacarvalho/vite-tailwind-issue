import { throttle } from 'lodash';
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';

export default function useWindowSize(options = { throttle: 100 }) {
  const width = ref(0);
  const height = ref(0);

  function setSize() {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }

  const onResize = throttle(setSize, options.throttle);

  onBeforeMount(setSize);

  onMounted(() => {
    window.addEventListener('resize', onResize, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener('resize', onResize);
  });

  return { width, height };
}
