import 'vite/modulepreload-polyfill';

import { createApp } from 'vue'
import { createPinia } from 'pinia';

import { i18n } from './lang';
import { router } from '@/router';

import App from './app.vue';
import { registerDirectives } from '@/directives';
import { registerDisplays } from '@/displays/register';
import { registerComponents } from '@/components/register';
import { registerInterfaces } from '@/interfaces/register';
import { registerLayouts } from '@/layouts/register';
import { loadModules } from '@/modules/register';
import { registerViews } from '@/views/register';

import '@/styles/app.scss';

init();

async function init() {
  const app = createApp(App);

  app.use(router);
  app.use(i18n);
  app.use(createPinia());

  registerDirectives(app);
  registerComponents(app);
  registerViews(app);

  await Promise.all([
    registerInterfaces(app),
    registerDisplays(app),
    registerLayouts(app),
    loadModules(),
  ]);

  app.mount('#app');

  // Prevent the browser from opening files that are dragged on the window
  window.addEventListener('dragover', (e) => e.preventDefault(), false);
  window.addEventListener('drop', (e) => e.preventDefault(), false);
}
