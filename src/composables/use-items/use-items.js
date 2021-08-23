import api from '@/api';
import useCollection from '@/composables/use-collection';
import filtersToQuery from '@/utils/filters-to-query';
import moveInArray from '@/utils/move-in-array';
import { isEqual, orderBy, throttle } from 'lodash';
import { computed, nextTick, ref, watch } from 'vue';

export function useItems(collection, query, fetchOnInit = true) {
  const { primaryKeyField, sortField } = useCollection(collection);

  let loadingTimeout = null;

  const { limit, fields, sort, page, filters, searchQuery } = query;

  const endpoint = computed(() => {
    if (! collection.value) return null;
    return collection.value.startsWith('system_')
      ? `/${collection.value.substring(7)}`
      : `/items/${collection.value}`;
  });

  const items = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const itemCount = ref(null);
  const totalCount = ref(null);
  const totalPages = ref(1);

  if (fetchOnInit) {
    getItems();
  }

  watch(
    collection,
    async (after, before) => {
      if (! before || isEqual(after, before)) {
        return;
      }

      // Waiting for the tick here makes sure the query have been adjusted for the new
      // collection
      await nextTick();
      reset();
      getItems();
    },
    { immediate: fetchOnInit },
  );

  watch([page, fields], async (after, before) => {
    if (! before || isEqual(after, before)) {
      return;
    }

    await nextTick();
    if (loading.value === false) {
      getItems();
    }
  });

  watch(sort, async (after, before) => {
    if (! before || isEqual(after, before)) {
      return;
    }

    // When all items are on page, we only sort locally
    const hasAllItems = limit.value > (itemCount.value || 0);

    if (hasAllItems) {
      sortItems(after);
      return;
    }

    await nextTick();
    if (loading.value === false) {
      getItems();
    }
  });

  watch([filters, limit], async (after, before) => {
    if (! before || isEqual(after, before)) {
      return;
    }
    page.value = 1;
    await nextTick();
    if (loading.value === false) {
      getItems();
    }
  });

  watch(
    searchQuery,
    throttle(
      async (after, before) => {
        if (isEqual(after, before)) {
          return;
        }
        page.value = 1;
        await nextTick();
        if (loading.value === false) {
          getItems();
        }
      },
      500,
      { trailing: true },
    ),
  );

  return { itemCount, totalCount, items, totalPages, loading, error, changeManualSort, getItems };

  async function getItems() {
    if (loadingTimeout || ! endpoint.value) return;

    error.value = null;

    loadingTimeout = setTimeout(() => {
      loading.value = true;
    }, 250);

    let fieldsToFetch = [...fields.value];

    // Make sure the primary key is always fetched
    if (
      fields.value.includes('*') === false &&
      primaryKeyField.value &&
      fieldsToFetch.includes(primaryKeyField.value.field) === false
    ) {
      fieldsToFetch.push(primaryKeyField.value.field);
    }

    // Make sure all fields that are used to filter are fetched
    if (fields.value.includes('*') === false) {
      filters.value.forEach((filter) => {
        if (fieldsToFetch.includes(filter.field) === false) {
          fieldsToFetch.push(filter.field);
        }
      });
    }

    // Make sure that the field we're sorting on is fetched
    if (fields.value.includes('*') === false && sortField.value && sort.value) {
      const sortFieldKey = sort.value.startsWith('-') ? sort.value.substring(1) : sort.value;
      if (fieldsToFetch.includes(sortFieldKey) === false) {
        fieldsToFetch.push(sortFieldKey);
      }
    }

    // Filter out fake internal columns. This is (among other things) for a fake $thumbnail m2o field
    // on directus_files
    fieldsToFetch = fieldsToFetch.filter((field) => field.startsWith('$') === false);

    try {
      const response = await api.get(endpoint.value, {
        params: {
          limit: limit.value,
          fields: fieldsToFetch,
          sort: sort.value,
          page: page.value,
          search: searchQuery.value,
          ...filtersToQuery(filters.value),
        },
      });

      let fetchedItems = response.data.data;

      /**
       * @NOTE
       *
       * This is used in conjunction with the fake field in /src/stores/fields/fields.ts to be
       * able to render out the directus_files collection (file library) using regular layouts
       *
       * Layouts expect the file to be a m2o of a `file` type, however, directus_files is the
       * only collection that doesn't have this (obviously). This fake $thumbnail field is used to
       * pretend there is a file m2o, so we can use the regular layout logic for files as well
       */
      if (collection.value === 'directus_files') {
        fetchedItems = fetchedItems.map((file) => ({
          ...file,
          $thumbnail: file,
        }));
      }

      items.value = fetchedItems;
      totalCount.value = response.data.meta.pagination.total;
      itemCount.value = response.data.meta.pagination.total;
      totalPages.value = response.data.meta.pagination.total_pages;

      if (fetchedItems.length === 0 && page.value !== 1) {
        page.value = 1;
      }

      // getItemCount();
    } catch (err) {
      error.value = err;
    } finally {
      clearTimeout(loadingTimeout);
      loadingTimeout = null;
      loading.value = false;
    }
  }

  async function getItemCount() {
    if (! primaryKeyField.value || ! endpoint.value) return;

    const response = await api.get(endpoint.value, {
      params: {
        limit: 0,
        fields: primaryKeyField.value.field,
        meta: ['filter_count', 'total_count'],
        search: searchQuery.value,
        ...filtersToQuery(filters.value),
      },
    });

    totalCount.value = response.data.meta.total_count;
    itemCount.value = response.data.meta.filter_count;
  }

  function reset() {
    items.value = [];
    totalCount.value = null;
    itemCount.value = null;
  }

  function sortItems(sortBy) {
    const field = sortBy.startsWith('-') ? sortBy.substring(1) : sortBy;
    const descending = sortBy.startsWith('-');
    items.value = orderBy(items.value, [field], [descending ? 'desc' : 'asc']);
  }

  async function changeManualSort({ item, to }) {
    const pk = primaryKeyField.value?.field;
    if (! pk) return;

    const fromIndex = items.value.findIndex((existing) => existing[pk] === item);
    const toIndex = items.value.findIndex((existing) => existing[pk] === to);

    items.value = moveInArray(items.value, fromIndex, toIndex);

    const endpoint = computed(() => `/utils/sort/${collection.value}`);
    await api.post(endpoint.value, { item, to });
  }
}
