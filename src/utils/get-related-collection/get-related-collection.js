import { useFieldsStore, useRelationsStore } from '@/stores';

export default function getRelatedCollection(collection, field) {
  const relationsStore = useRelationsStore();
  const fieldsStore = useFieldsStore();

  const relations = relationsStore.getRelationsForField(collection, field);

  const fieldInfo = fieldsStore.getField(collection, field);

  const type = fieldInfo.type.toLowerCase();

  const o2mTypes = ['o2m', 'm2m', 'm2a', 'alias', 'translations', 'files'];
  if (o2mTypes.includes(type)) {
    return relations[0].collection;
  }

  return relations[0].related_collection;
}
