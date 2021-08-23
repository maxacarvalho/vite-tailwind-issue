import { defineModule } from '@/utils';
import RouterPass from '@/utils/router-passthrough';

import SurveysCollection from './routes/surveys-collection.vue';
import SurveysItem from './routes/surveys-item.vue';

export default defineModule({
  id: 'surveys',
  name: '$t:modules.surveys',
  icon: 'poll',
  color: 'var(--warning)',
  routes: [
    {
      path: '',
      redirect: '/surveys/surveys',
    },
    {
      path: ':collection',
      component: RouterPass,
      children: [
        {
          name: 'surveys-collection',
          path: '',
          component: SurveysCollection,
          props: (route) => ({
            collection: route.params.collection,
            bookmark: route.query.bookmark,
          }),
        },
        {
          name: 'surveys-item',
          path: ':primaryKey',
          component: SurveysItem,
          props: true,
        },
      ],
    },
  ],
  order: 5,
  persistent: true,
});
