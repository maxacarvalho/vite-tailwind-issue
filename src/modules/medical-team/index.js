import { defineModule } from '@/utils';
import RouterPass from '@/utils/router-passthrough';

import MedicalTeamCollection from './routes/medical-team-collection.vue';
import MedicalTeamItem from './routes/medical-team-item.vue';

export default defineModule({
  'id': 'medical-team',
  name: '$t:modules.medical_team',
  icon: 'local_hospital',
  color: 'var(--warning)',
  routes: [
    {
      path: '',
      redirect: '/medical-team/doctors',
    },
    {
      path: ':collection',
      component: RouterPass,
      children: [
        {
          name: 'medical-team-collection',
          path: '',
          component: MedicalTeamCollection,
          props: (route) => ({
            collection: route.params.collection,
            bookmark: route.query.bookmark,
          }),
        },
        {
          name: 'medical-team-item',
          path: ':primaryKey',
          component: MedicalTeamItem,
          props: true,
        },
      ],
    },
  ],
  order: 4,
  persistent: true,
});
