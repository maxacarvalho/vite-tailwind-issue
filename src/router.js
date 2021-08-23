import { createRouter, createWebHistory } from 'vue-router';

import { useAppStore, useUserStore } from '@/stores';

import GlobalPageNotFound from '@/routes/private-not-found';

import { hydrate } from '@/hydrate';

export const defaultRoutes = [
  {
    path: '/',
    redirect: '/surveys',
  },
  {
    name: '404',
    path: '/:_(.+)+',
    component: GlobalPageNotFound,
  },
];

export const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? 'next/vrouter/' : 'admin/'),
  routes: defaultRoutes,
});

export const onBeforeEach = async (to, from) => {
  const appStore = useAppStore();
  const userStore = useUserStore();

  if (appStore.hydrated === false) {
    appStore.hydrating = false;

    await userStore.hydrate();

    if (appStore.authenticated === true && appStore.hydrating === false) {
      await hydrate();

      return to.fullPath;
    } else {
      window.location.href = process.env.NODE_ENV === 'production' ? '/admin' : 'https://web.nicksaude.test';
    }
  }
};

let trackTimeout = null;

export const onAfterEach = (to) => {
  const userStore = useUserStore();

  if (to.meta.public !== true) {
    // The timeout gives the page some breathing room to load. No need to clog up the thread with
    // this call while more important things are loading

    if (trackTimeout) {
      clearTimeout(trackTimeout);
      trackTimeout = null;
    }

    setTimeout(() => {
      // userStore.trackPage(to.fullPath);
    }, 500);
  }
};

router.beforeEach(onBeforeEach);
router.afterEach(onAfterEach);
