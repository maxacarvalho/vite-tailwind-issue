import { getDisplays } from '@/displays';
import { useFieldsStore } from '@/stores';

export default function adjustFieldsForDisplays(fields, parentCollection) {
  const fieldsStore = useFieldsStore();
	const { displays } = getDisplays();

  const adjustedFields = fields
    .map((fieldKey) => {
      const field = fieldsStore.getField(parentCollection, fieldKey);

      if (!field) return fieldKey;
      if (field.meta?.display === null) return fieldKey;

      const display = displays.value.find((d) => d.id === field.meta?.display);

      if (!display) return fieldKey;
      if (!display?.fields) return fieldKey;

      let fieldKeys = null;

      if (Array.isArray(display.fields)) {
        fieldKeys = display.fields.map((relatedFieldKey) => `${fieldKey}.${relatedFieldKey}`);
      }

      if (typeof display.fields === 'function') {
        fieldKeys = display
          .fields(field.meta?.display_options, {
            collection: field.collection,
            field: field.field,
            type: field.type,
          })
          .map((relatedFieldKey) => `${fieldKey}.${relatedFieldKey}`);
      }

      if (fieldKeys) {
        return fieldKeys.map((fieldKey) => {
          /**
           * This is for the special case where you want to show a thumbnail in a relation to
           * directus_files. The thumbnail itself isn't a real field, but shows the thumbnail based
           * on the other available fields (like ID, title, and type).
           */
          if (fieldKey.includes('$thumbnail') && field.collection === 'directus_files') {
            return fieldKey
              .split('.')
              .filter((part) => part !== '$thumbnail')
              .join('.');
          }

          return fieldKey;
        });
      }

      return fieldKey;
    })
    .flat();

  return adjustedFields;
}
