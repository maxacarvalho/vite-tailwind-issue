import { ref } from 'vue';
import { nanoid } from 'nanoid';

export function useNotifications() {
  const dialogsStore = ref([]);
  const queueStore = ref([]);

  return {
    add,
    remove,
    queueStore,
    dialogsStore,
  };

  function add(notification) {
    const id = nanoid();
    const timestamp = Date.now();

    if (notification.dialog === true) {
      notification.persist = true;

      dialogsStore.value = [
        ...dialogsStore.value,
        {
          ...notification,
          id,
          timestamp,
        }
      ];
    } else {
      queueStore.value = [
        ...queueStore.value,
        {
          ...notification,
          id,
          timestamp,
        },
      ];
    }

    if (notification.persist !== true) {
      setTimeout(() => {
        remove(id)
      }, 3000);
    }

    return id;
  }

  function remove(id) {
    const queues = [ queueStore.value , ...dialogsStore.value ];

    const toBeRemoved = queues.find((n) => n.id === id);

    if (! toBeRemoved) return;

    if (toBeRemoved.dialog === true) {
      dialogsStore.value = dialogsStore.value.filter((n) => n.id !== id);
    } else {
      queueStore.value = queueStore.value.filter((n) => n.id !== id);
    }
  }
}
