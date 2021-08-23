import { defineDisplay } from '@/displays/define';
import useCollection from '@/composables/use-collection';
import adjustFieldsForDisplays from '@/utils/adjust-fields-for-displays';
import { getFieldsFromTemplate } from '@/utils/get-fields-from-template';
import getRelatedCollection from '@/utils/get-related-collection';
import { ref } from 'vue';
import options from './options.vue';
import DisplayRelatedValues from './related-values.vue';

export default defineDisplay({
  id: 'related-values',
  name: '$t:displays.related-values.related-values',
  description: '$t:displays.related-values.description',
  icon: 'settings_ethernet',
  handler: DisplayRelatedValues,
  options: options,
  types: ['alias', 'string', 'uuid', 'integer', 'bigInteger', 'json'],
  groups: ['m2m', 'm2o', 'o2m'],
  fields: (options, { field, collection }) => {
    const relatedCollection = getRelatedCollection(collection, field);
    const { primaryKeyField } = useCollection(ref(relatedCollection));

    if (! relatedCollection) return [];

    const fields = options?.template
      ? adjustFieldsForDisplays(getFieldsFromTemplate(options.template), relatedCollection)
      : [];

    if (primaryKeyField.value && ! fields.includes(primaryKeyField.value.field)) {
      fields.push(primaryKeyField.value.field);
    }

    return fields;
  },
});
