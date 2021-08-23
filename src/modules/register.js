import { router } from '@/router';
import { usePermissionsStore, useUserStore } from '@/stores';
import RouterPass from '@/utils/router-passthrough';
import { getModules } from './index';

const { modulesRaw } = getModules();

let queuedModules = [];

export async function loadModules() {
  const moduleModules = import.meta.globEager('./*/**/index.js');

  const modules = Object.values(moduleModules).map((module) => module.default);

  queuedModules = modules;
}

export async function register() {
  const userStore = useUserStore();
  const permissionsStore = usePermissionsStore();

  const registeredModules = [];

  for (const mod of queuedModules) {
    if (!userStore.currentUser) continue;

    if (mod.preRegisterCheck) {
      const allowed = await mod.preRegisterCheck(userStore.currentUser, permissionsStore.permissions);
      if (allowed) registeredModules.push(mod);
    } else {
      registeredModules.push(mod);
    }
  }

  for (const module of registeredModules) {
    router.addRoute({
      name: module.id,
      path: `/${module.id}`,
      component: RouterPass,
      children: module.routes,
    });
  }

  modulesRaw.value = registeredModules;
}

export function unregister() {
  for (const module of modulesRaw.value) {
    router.removeRoute(module.id);
  }

  modulesRaw.value = [];
}
