import { i18n } from '@/lang';
import { useNotificationsStore } from '@/stores';

let store;

export function unexpectedError(error) {
  if (! store) store = useNotificationsStore();

  const code =
    (error).response?.data?.errors?.[0]?.extensions?.code ||
    (error)?.extensions?.code ||
    'UNKNOWN';

  const message = (error).response?.data?.errors?.[0]?.message || error.message || undefined;

  // eslint-disable-next-line no-console
  console.warn(error);

  store.add({
    title: i18n.global.t(`errors.${code}`),
    text: message,
    type: 'error',
    dialog: true,
    error,
  });
}
