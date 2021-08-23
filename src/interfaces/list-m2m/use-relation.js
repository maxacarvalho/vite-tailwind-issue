import useCollection from '@/composables/use-collection';
import { useCollectionsStore, useRelationsStore } from '@/stores';
import { computed } from 'vue';

export default function useRelation(collection, field) {
  const relationsStore = useRelationsStore();
  const collectionsStore = useCollectionsStore();

  const relations = computed(() => {
    return relationsStore.getRelationsForField(collection.value, field.value);
  });

  const junction = computed(() => {
    return relations.value.find(
      (relation) => relation.related_collection === collection.value && relation.meta?.one_field === field.value,
    );
  });

  const relation = computed(() => {
    return relations.value.find(
      (relation) =>
        relation.collection === junction.value.collection &&
        relation.field !== junction.value.field &&
        relation.field === junction.value.meta?.junction_field,
    );
  });

  const junctionCollection = computed(() => {
    return collectionsStore.getCollection(junction.value.collection);
  });

  const relationCollection = computed(() => {
    return collectionsStore.getCollection(relation.value.related_collection);
  });

  const { primaryKeyField: junctionPrimaryKeyField } = useCollection(junctionCollection.value.collection);
  const { primaryKeyField: relationPrimaryKeyField } = useCollection(relationCollection.value.collection);

  const relationInfo = computed(() => {
    return {
      junctionPkField: junctionPrimaryKeyField.value.field,
      relationPkField: relationPrimaryKeyField.value.field,
      junctionField: junction.value.meta?.junction_field,
      sortField: junction.value.meta?.sort_field,
      junctionCollection: junctionCollection.value.collection,
      relationCollection: relationCollection.value.collection,
    };
  });

  return {
    junction,
    junctionCollection,
    relation,
    relationCollection,
    relationInfo,
    junctionPrimaryKeyField,
    relationPrimaryKeyField,
  };
}
