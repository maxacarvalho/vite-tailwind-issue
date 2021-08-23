import { ref, watch } from 'vue';

export function useTitle(newTitle) {
  if (newTitle === undefined || newTitle === null) return;

  const titleRef = typeof newTitle === 'string' ? ref(newTitle) : newTitle;

  watch(
    titleRef,
    (title, oldTitle) => {
      if (typeof title === 'string' && oldTitle !== title) document.title = title;
    },
    { immediate: true },
  );

  return titleRef;
}
