import { defineAsyncComponent } from 'vue';
// import PublicView from './public/';

const PrivateView = defineAsyncComponent(() => import('./private'));

export function registerViews(app) {
  // app.component('public-view', PublicView);
  app.component('private-view', PrivateView);
}
