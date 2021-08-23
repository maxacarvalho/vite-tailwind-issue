import { computed, ref } from 'vue';
import { sortBy } from 'lodash-es';
import { useCollectionsStore, useFieldsStore } from '@/stores';

export function useCollection(collectionKey) {
  const collectionsStore = useCollectionsStore();
  const fieldsStore = useFieldsStore();

  const collection = typeof collectionKey === 'string' ? ref(collectionKey) : collectionKey;

  const info = computed(() => {
    return collectionsStore.collections.find(({ collection: key }) => key === collection.value) || null;
  });

  const fields = computed(() => {
    if (!collection.value) return [];

    return sortBy(fieldsStore.getFieldsForCollection(collection.value), ['meta.grid_position', 'field']);
  });

  const defaults = computed(() => {
    if (!fields.value) return {};

    const defaults = {};

    for (const field of fields.value) {
      if (field.schema?.default_value) {
        defaults[field.field] = field.schema.default_value;
      }
    }

    return defaults;
  });

  const primaryKeyField = computed(() => {
    return (
      fields.value.find((field) => field.collection === collection.value && field.schema?.is_primary_key === true) ||
      null
    );
  });

  const userCreatedField = computed(() => {
    return fields.value?.find((field) => (field.meta?.special || []).includes('user_created')) || null;
  });

  const sortField = computed(() => {
    return info.value?.meta?.sort_field || null;
  });

  const isSingleton = computed(() => {
    return info.value?.meta?.singleton === true;
  });

  const accountabilityScope = computed(() => {
    if (!info.value) return null;
    if (!info.value.meta) return null;
    return info.value.meta?.accountability || null;
  });

  return {
    info,
    fields,
    defaults,
    sortField,
    isSingleton,
    primaryKeyField,
    userCreatedField,
    collectionsStore,
    accountabilityScope,
  };
}
