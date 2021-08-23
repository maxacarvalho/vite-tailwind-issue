import { clone } from 'lodash-es';

export default function filtersToQuery(filters) {
  const filterList = [];

  for (const filter of filters) {
    const { field, operator } = clone(filter);
    let { value } = clone(filter);

    if (['empty', 'nempty', 'null', 'nnull'].includes(operator)) {
      value = true;
    }

    if (field.includes('.')) {
      let filter = { [`_${operator}`]: value };
      const path = field.split('.');

      for (const field of path.reverse()) {
        filter = { [field]: filter };
      }

      filterList.push(filter);
    } else {
      filterList.push({ [field]: { [`_${operator}`]: value } });
    }
  }

  let filterQuery = {};

  if (filterList.length === 1) {
    filterQuery = filterList[0];
  } else if (filterList.length > 1) {
    filterQuery = { _and: filterList };
  }

  return { filter: filterQuery };
}
