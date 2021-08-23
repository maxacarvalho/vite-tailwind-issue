import { onBeforeMount, onBeforeUnmount } from 'vue';

export default function unsavedChanges(isSavable) {
  onBeforeMount(() => {
    window.addEventListener('beforeunload', beforeUnload);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', beforeUnload);
  });

  function beforeUnload(event) {
    if (isSavable.value) {
      event.preventDefault();
      event.returnValue = '';
      return '';
    }
  }
}
