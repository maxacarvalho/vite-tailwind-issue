import { defineLayout } from '@/layouts/define';
import TabularLayout from './tabular.vue';
import TabularOptions from './options.vue';
import TabularSidebar from './sidebar.vue';
import TabularActions from './actions.vue';

import { useI18n } from 'vue-i18n';
import { ref, computed, inject, watch, toRefs } from 'vue';

import { useRouter } from 'vue-router';
import { debounce, clone } from 'lodash';
import useCollection from '@/composables/use-collection';
import useItems from '@/composables/use-items';
import adjustFieldsForDisplays from '@/utils/adjust-fields-for-displays';
import hideDragImage from '@/utils/hide-drag-image';
import useShortcut from '@/composables/use-shortcut';
import { getDefaultDisplayForType } from '@/utils/get-default-display-for-type';

export default defineLayout({
  id: 'tabular',
  name: '$t:layouts.tabular.tabular',
  icon: 'reorder',
  component: TabularLayout,
  slots: {
    options: TabularOptions,
    sidebar: TabularSidebar,
    actions: TabularActions,
  },
  setup(props) {
    const { t, n } = useI18n();

    const router = useRouter();

    const table = ref();
    const mainElement = inject('main-element', ref(null));

    const { collection, searchQuery, selection, layoutOptions, layoutQuery, filters } = toRefs(props);

    const { info, primaryKeyField, fields: fieldsInCollection, sortField } = useCollection(collection);

    const { sort, limit, page, fields, fieldsWithRelational } = useItemOptions();

    const { items, loading, error, totalPages, itemCount, totalCount, changeManualSort, getItems } = useItems(
      collection,
      {
        sort,
        limit,
        page,
        fields: fieldsWithRelational,
        filters: filters,
        searchQuery: searchQuery,
      }
    );

    const { tableSort, tableHeaders, tableRowHeight, onRowClick, onSortChange, activeFields, tableSpacing } =
      useTable();

    const showingCount = computed(() => {
      if ((itemCount.value || 0) < (totalCount.value || 0)) {
        if (itemCount.value === 1) {
          return t('one_filtered_item');
        }
        return t('start_end_of_count_filtered_items', {
          start: n((+page.value - 1) * limit.value + 1),
          end: n(Math.min(page.value * limit.value, itemCount.value || 0)),
          count: n(itemCount.value || 0),
        });
      }
      if (itemCount.value === 1) {
        return t('one_item');
      }
      return t('start_end_of_count_items', {
        start: n((+page.value - 1) * limit.value + 1),
        end: n(Math.min(page.value * limit.value, itemCount.value || 0)),
        count: n(itemCount.value || 0),
      });
    });

    const activeFilterCount = computed(() => {
      let count = filters.value.filter((filter) => !filter.locked).length;

      if (searchQuery.value && searchQuery.value.length > 0) count++;

      return count;
    });

    const availableFields = computed(() => {
      return fieldsInCollection.value.filter((field) => field.meta?.special?.includes('no-data') !== true);
    });

    useShortcut(
      'meta+a',
      () => {
        if (!primaryKeyField.value) return;
        const pk = primaryKeyField.value;
        selection.value = clone(items.value).map((item) => item[pk.field]);
      },
      table
    );

    return {
      table,
      tableHeaders,
      items,
      loading,
      error,
      totalPages,
      tableSort,
      onRowClick,
      onSortChange,
      tableRowHeight,
      page,
      toPage,
      itemCount,
      totalCount,
      fieldsInCollection,
      fields,
      limit,
      activeFields,
      tableSpacing,
      primaryKeyField,
      info,
      showingCount,
      sortField,
      changeManualSort,
      hideDragImage,
      activeFilterCount,
      refresh,
      resetPresetAndRefresh,
      availableFields,
    };

    async function resetPresetAndRefresh() {
      await props?.resetPreset?.();
      refresh();
    }

    function refresh() {
      getItems();
    }

    function toPage(newPage) {
      page.value = newPage;
      mainElement.value?.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    function useItemOptions() {
      const page = computed({
        get() {
          return layoutQuery.value?.page || 1;
        },
        set(newPage) {
          layoutQuery.value = {
            ...(layoutQuery.value || {}),
            page: newPage,
          };
        },
      });

      const sort = computed({
        get() {
          return layoutQuery.value?.sort || primaryKeyField.value?.field || '';
        },
        set(newSort) {
          layoutQuery.value = {
            ...(layoutQuery.value || {}),
            page: 1,
            sort: newSort,
          };
        },
      });

      const limit = computed({
        get() {
          return layoutQuery.value?.limit || 25;
        },
        set(newLimit) {
          layoutQuery.value = {
            ...(layoutQuery.value || {}),
            page: 1,
            limit: newLimit,
          };
        },
      });

      const fields = computed({
        get() {
          if (layoutQuery.value?.fields) {
            // This shouldn't be the case, but double check just in case it's stored
            // differently in the DB from previous versions
            if (typeof layoutQuery.value.fields === 'string') {
              return (layoutQuery.value.fields).split(',');
            }

            if (Array.isArray(layoutQuery.value.fields)) return layoutQuery.value.fields;
          }

          const fields =
            layoutQuery.value?.fields ||
            fieldsInCollection.value
              .filter((field) => !!field.meta?.hidden === false)
              .slice(0, 4)
              .sort((a, b) => {
                if (a.field < b.field) return -1;
                else if (a.field > b.field) return 1;
                else return 1;
              })
              .map(({ field }) => field);

          return fields;
        },
        set(newFields) {
          layoutQuery.value = {
            ...(layoutQuery.value || {}),
            fields: newFields,
          };
        },
      });

      const fieldsWithRelational = computed(() => {
        if (!props.collection) return [];
        return adjustFieldsForDisplays(fields.value, props.collection);
      });

      return { sort, limit, page, fields, fieldsWithRelational };
    }

    function useTable() {
      const tableSort = computed(() => {
        if (sort.value?.startsWith('-')) {
          return { by: sort.value.substring(1), desc: true };
        } else {
          return { by: sort.value, desc: false };
        }
      });

      const localWidths = ref({});

      watch(
        () => layoutOptions.value,
        () => {
          localWidths.value = {};
        }
      );

      const saveWidthsTolayoutOptions = debounce(() => {
        layoutOptions.value = {
          ...(layoutOptions.value || {}),
          widths: localWidths.value,
        };
      }, 350);

      const activeFields = computed({
        get() {
          return fields.value
            .map((key) => fieldsInCollection.value.find((field) => field.field === key))
            .filter((f) => f);
        },
        set(val) {
          fields.value = val.map((field) => field.field);
        },
      });

      const tableHeaders = computed({
        get() {
          return activeFields.value.map((field) => ({
            text: field.name,
            value: field.field,
            width: localWidths.value[field.field] || layoutOptions.value?.widths?.[field.field] || null,
            field: {
              display: field.meta?.display || getDefaultDisplayForType(field.type),
              displayOptions: field.meta?.display_options,
              interface: field.meta?.interface,
              interfaceOptions: field.meta?.options,
              type: field.type,
              field: field.field,
            },
            sortable:
              ['json', 'o2m', 'm2o', 'm2m', 'm2a', 'file', 'files', 'alias', 'presentation', 'translations'].includes(
                field.type
              ) === false,
          }));
        },
        set(val) {
          const widths = {};

          val.forEach((header) => {
            if (header.width) {
              widths[header.value] = header.width;
            }
          });

          localWidths.value = widths;

          saveWidthsTolayoutOptions();
        },
      });

      const tableSpacing = computed({
        get() {
          return layoutOptions.value?.spacing || 'cozy';
        },
        set(newSpacing) {
          layoutOptions.value = {
            ...(layoutOptions.value || {}),
            spacing: newSpacing,
          };
        },
      });

      const tableRowHeight = computed(() => {
        switch (tableSpacing.value) {
          case 'compact':
            return 32;
          case 'cozy':
          default:
            return 48;
          case 'comfortable':
            return 64;
        }
      });

      return {
        tableSort,
        tableHeaders,
        tableSpacing,
        tableRowHeight,
        onRowClick,
        onSortChange,
        activeFields,
        getFieldDisplay,
      };

      function onRowClick(item) {
        if (props.readonly === true || !primaryKeyField.value) return;

        if (props.selectMode || selection.value?.length > 0) {
          (table.value).onItemSelected({
            item,
            value: selection.value?.includes(item[primaryKeyField.value.field]) === false,
          });
        } else {
          const primaryKey = item[primaryKeyField.value.field];

          router.push(`${router.currentRoute.value.fullPath}/${encodeURIComponent(primaryKey)}`);
        }
      }

      function onSortChange(newSort) {
        let sortString = newSort.by;
        if (newSort.desc === true) sortString = '-' + sortString;

        sort.value = sortString;
      }

      function getFieldDisplay(fieldKey) {
        const field = fieldsInCollection.value.find((field) => field.field === fieldKey);

        if (field === undefined) return null;
        if (!field.meta?.display) return null;

        return {
          display: field.meta?.display,
          options: field.meta?.display_options,
        };
      }
    }
  },
});
