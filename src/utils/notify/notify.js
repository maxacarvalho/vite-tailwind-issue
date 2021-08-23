import { useNotificationsStore } from '@/stores';

let store;

export function notify(notification) {
  if (!store) store = useNotificationsStore();
  store.add(notification);
}
