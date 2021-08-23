import { useUserStore } from '@/stores';
import { deepMap } from '@/utils/deep-map';

export function parseFilter(filter) {
  const userStore = useUserStore();

  return deepMap(filter, (val, key) => {
    if (val === 'true') return true;
    if (val === 'false') return false;

    if (key === '_in' || key === '_nin') {
      if (typeof val === 'string' && val.includes(',')) return val.split(',');
      else return Array.isArray(val) ? val : [val];
    }

    if (val === '$NOW') return new Date();
    if (val === '$CURRENT_USER') return userStore?.currentUser?.id || null;
    if (val === '$CURRENT_ROLE') return userStore?.currentUser?.role?.id || null;

    return val;
  });
}
