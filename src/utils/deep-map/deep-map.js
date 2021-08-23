import { isPlainObject, transform } from 'lodash';

export function deepMap(obj, iterator, context) {
  return transform(obj, function (result, val, key) {
    result[key] = isPlainObject(val) ? deepMap(val, iterator, context) : iterator.call(context, val, key, obj);
  });
}
