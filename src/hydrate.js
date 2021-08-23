import { setLanguage } from '@/lang/set-language';
import { register as registerModules, unregister as unregisterModules } from '@/modules/register';
import {
  useAppStore,
  useCollectionsStore,
  useFieldsStore,
  usePermissionsStore,
  usePresetsStore,
  useRelationsStore,
  useServerStore,
  useUserStore,
} from '@/stores';

export function useStores(
  stores = [
    useCollectionsStore,
    useFieldsStore,
    useUserStore,
    usePresetsStore,
    useServerStore,
    useRelationsStore,
    usePermissionsStore,
  ],
) {
  return stores.map((useStore) => useStore());
}

export async function hydrate(stores = useStores()) {
  const appStore = useAppStore();
  const userStore = useUserStore();

  if (appStore.hydrated) return;
  if (appStore.hydrating) return;

  appStore.hydrating = true;

  try {
    await userStore.hydrate();

    if (userStore.currentUser?.role) {
      await Promise.all(stores.map((store) => store.hydrate?.()));
      await registerModules();
      await setLanguage(userStore.currentUser?.language || 'pt-BR');
    }
  } catch (error) {
    appStore.error = error;
  } finally {
    appStore.hydrating = false;
  }

  appStore.hydrated = true;
}
