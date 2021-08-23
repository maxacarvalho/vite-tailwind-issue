import { i18n } from '@/lang';
import { cloneDeep } from 'lodash';

export function translate(obj) {
  const newObj = cloneDeep(obj);

  Object.entries(newObj).forEach(([key, val]) => {
    if (val && typeof val === 'object') newObj[key] = translate(val);
    if (val && typeof val === 'string' && val.startsWith('$t:'))
      newObj[key] = i18n.global.t(val.replace('$t:', ''));
  });

  return newObj;
}
