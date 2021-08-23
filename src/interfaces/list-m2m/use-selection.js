import { get } from 'lodash';
import { computed, ref } from 'vue';

export default function useSelection(
  value,
  items,
  relation,
  emit,
) {
  const selectModalActive = ref(false);

  const selectedPrimaryKeys = computed(() => {
    if (items.value === null) return [];

    const { relationPkField, junctionField } = relation.value;

    const selectedKeys = items.value.reduce((acc, current) => {
      const key = get(current, [junctionField, relationPkField]);
      if (key !== undefined) acc.push(key);
      return acc;
    }, []);

    return selectedKeys;
  });

  const selectionFilters = computed(() => {
    const { relationPkField } = relation.value;

    if (selectedPrimaryKeys.value.length === 0) return [];

    const filter = {
      key: 'selection',
      field: relationPkField,
      operator: 'nin',
      value: selectedPrimaryKeys.value.join(','),
      locked: true,
    };

    return [filter];
  });

  function stageSelection(newSelection) {
    const { junctionField } = relation.value;

    const selection = newSelection.reduce((acc, item) => {
      if (selectedPrimaryKeys.value.includes(item) === false) acc.push({ [junctionField]: item });
      return acc;
    }, []);

    const newVal = [...selection, ...(value.value || [])];
    if (newVal.length === 0) emit(null);
    else emit(newVal);
  }

  return { stageSelection, selectModalActive, selectedPrimaryKeys, selectionFilters };
}
