import api from '@/api';
import { useFieldsStore } from '@/stores';
import { addRelatedPrimaryKeyToFields } from '@/utils/add-related-primary-key-to-fields';
import { cloneDeep, get, merge } from 'lodash';
import { ref, watch } from 'vue';

export default function usePreview(
  value,
  fields,
  relation,
  getNewSelectedItems,
  getUpdatedItems,
  getNewItems,
  getPrimaryKeys,
) {
  // Using a ref for the table headers here means that the table itself can update the
  // values if it needs to. This allows the user to manually resize the columns for example

  const fieldsStore = useFieldsStore();
  const tableHeaders = ref([]);
  const loading = ref(false);
  const items = ref([]);
  const error = ref(null);

  watch(
    () => value.value,
    async (newVal) => {
      if (newVal === null) {
        items.value = [];
        return;
      }

      loading.value = true;
      const { junctionField, relationPkField, junctionPkField, relationCollection } = relation.value;
      if (junctionField === null) return;

      // Load the junction items so we have access to the id's in the related collection
      const junctionItems = await loadRelatedIds();

      const relatedPrimaryKeys = junctionItems.reduce((acc, junction) => {
        const id = get(junction, junctionField);
        if (id !== null) acc.push(id);
        return acc;
      }, []);

      const filteredFields = [...(fields.value.length > 0 ? getRelatedFields(fields.value) : getDefaultFields())];

      if (filteredFields.includes(relationPkField) === false) filteredFields.push(relationPkField);

      try {
        let responseData = [];

        if (relatedPrimaryKeys.length > 0) {
          responseData = await request(relationCollection, filteredFields, relationPkField, relatedPrimaryKeys);
        }

        // Insert the related items into the junction items
        responseData = responseData.map((data) => {
          const id = get(data, relationPkField);
          const junction = junctionItems.find((junction) => junction[junctionField] === id);

          if (junction === undefined || id === undefined) return;

          const newJunction = cloneDeep(junction);
          newJunction[junctionField] = data;
          return newJunction;
        });

        const updatedItems = getUpdatedItems();
        const newItems = getNewItems();

        // Replace existing items with it's updated counterparts
        responseData = responseData
          .map((item) => {
            const updatedItem = updatedItems.find((updated) => updated[junctionPkField] === item[junctionPkField]);
            if (updatedItem !== undefined) return merge(item, updatedItem);
            return item;
          })
          .concat(...newItems);

        items.value = responseData;
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    },
    { immediate: true },
  );

  // Seeing we don't care about saving those tableHeaders, we can reset it whenever the
  // fields prop changes (most likely when we're navigating to a different o2m context)
  watch(
    () => fields.value,
    () => {
      const { junctionField, junctionCollection } = relation.value;

      tableHeaders.value = (
        fields.value.length > 0 ? fields.value : getDefaultFields().map((field) => `${junctionField}.${field}`)
      )
        .map((fieldKey) => {
          const field = fieldsStore.getField(junctionCollection, fieldKey);

          if (! field) return null;

          const header = {
            text: field.name,
            value: fieldKey,
            align: 'left',
            sortable: true,
            width: null,
            field: {
              display: field.meta?.display,
              displayOptions: field.meta?.display_options,
              interface: field.meta?.interface,
              interfaceOptions: field.meta?.options,
              type: field.type,
              field: field.field,
            },
          };

          return header;
        })
        .filter((h) => h);
    },
    { immediate: true },
  );

  return { tableHeaders, items, loading, error };

  function getRelatedFields(fields) {
    const { junctionField } = relation.value;

    return fields.reduce((acc, field) => {
      const sections = field.split('.');
      if (junctionField === sections[0] && sections.length >= 2) acc.push(sections.slice(1).join('.'));
      return acc;
    }, []);
  }

  function getJunctionFields() {
    return (fields.value || []).filter((field) => field.includes('.') === false);
  }

  async function loadRelatedIds() {
    const { junctionPkField, junctionField, relationPkField, junctionCollection } = relation.value;

    try {
      let data = [];
      const primaryKeys = getPrimaryKeys();

      if (primaryKeys.length > 0) {
        const filteredFields = getJunctionFields();

        if (filteredFields.includes(junctionPkField) === false) filteredFields.push(junctionPkField);
        if (filteredFields.includes(junctionField) === false) filteredFields.push(junctionField);

        if (relation.value.sortField !== null && filteredFields.includes(relation.value.sortField) === false)
          filteredFields.push(relation.value.sortField);

        data = await request(junctionCollection, filteredFields, junctionPkField, primaryKeys);
      }

      const updatedItems = getUpdatedItems().map((item) => ({
        [junctionField]: item[junctionField][relationPkField],
      }));

      // Add all items that already had the id of it's related item
      return data.concat(...getNewSelectedItems(), ...updatedItems);
    } catch (err) {
      error.value = err;
    }
    return [];
  }

  async function request(
    collection,
    fields,
    filteredField,
    primaryKeys,
  ) {
    if (fields === null || fields.length === 0 || primaryKeys === null || primaryKeys.length === 0) return [];

    const endpoint = collection.startsWith('system_') ? `/${collection.substring(7)}` : `/items/${collection}`;

    const fieldsToFetch = addRelatedPrimaryKeyToFields(collection, fields);

    const response = await api.get(endpoint, {
      params: {
        fields: fieldsToFetch,
        [`filter[${filteredField}][_in]`]: primaryKeys.join(','),
      },
    });
    return response?.data.data;
  }

  function getDefaultFields() {
    const fields = fieldsStore.getFieldsForCollection(relation.value.relationCollection);
    return fields.slice(0, 3).map((field) => field.field);
  }
}
