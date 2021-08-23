import { sortBy } from 'lodash';
import { computed, ref } from 'vue';

export default function useSort(
  relation,
  fields,
  items,
  emit,
) {
  const sort = ref({ by: relation.value.sortField || fields.value[0], desc: false });

  const sortedItems = computed(() => {
    const sField = relation.value.sortField;
    if (sField === null || sort.value.by !== sField) return items.value;

    const desc = sort.value.desc;
    const sorted = sortBy(items.value, [sField]);
    return desc ? sorted.reverse() : sorted;
  });

  return { sort, sortItems, sortedItems };

  function sortItems(newItems) {
    const sField = relation.value.sortField;
    if (sField === null) return;

    const itemsSorted = newItems.map((item, i) => {
      item[sField] = i;
      return item;
    });

    emit(itemsSorted);
  }
}
