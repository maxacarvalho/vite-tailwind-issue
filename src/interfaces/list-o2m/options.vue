<template>
  <v-notice v-if="relatedCollection === null" type="warning">
    {{ t('interfaces.list-o2m.no_collection') }}
  </v-notice>
  <div v-else className="form-grid">
    <div className="field full">
      <p className="type-label">{{ t('display_template') }}</p>
      <v-field-template
        v-model="template"
        :collection="relatedCollection"
        :depth="2"
        :inject="!!relatedCollectionInfo ? null : { fields: newFields, collections: newCollections, relations }"
        :placeholder="
					relatedCollectionInfo && relatedCollectionInfo.meta && relatedCollectionInfo.meta.display_template
				"
      />
    </div>

    <div className="field half-left">
      <p className="type-label">{{ t('creating_items') }}</p>
      <v-checkbox v-model="enableCreate" block :label="t('enable_create_button')" />
    </div>

    <div className="field half-right">
      <p className="type-label">{{ t('selecting_items') }}</p>
      <v-checkbox v-model="enableSelect" block :label="t('enable_select_button')" />
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { defineComponent, computed } from 'vue';
import { useCollectionsStore } from '@/stores';

export default defineComponent({
  props: {
    collection: {
      type: String,
      required: true,
    },
    fieldData: {
      type: Object,
      default: null,
    },
    relations: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      default: null,
    },
    newCollections: {
      type: Array,
      default: () => [],
    },
    newFields: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['input'],
  setup(props, { emit }) {
    const { t } = useI18n();

    const collectionsStore = useCollectionsStore();

    const template = computed({
      get() {
        return props.value?.template;
      },
      set(newTemplate) {
        emit('input', {
          ...(props.value || {}),
          template: newTemplate,
        });
      },
    });

    const enableCreate = computed({
      get() {
        return props.value?.enableCreate ?? true;
      },
      set(val) {
        emit('input', {
          ...(props.value || {}),
          enableCreate: val,
        });
      },
    });

    const enableSelect = computed({
      get() {
        return props.value?.enableSelect ?? true;
      },
      set(val) {
        emit('input', {
          ...(props.value || {}),
          enableSelect: val,
        });
      },
    });

    const relatedCollection = computed(() => {
      if (! props.fieldData || ! props.relations || props.relations.length === 0) return null;
      const { field } = props.fieldData;
      const relatedRelation = props.relations.find(
        (relation) => relation.related_collection === props.collection && relation.meta?.one_field === field,
      );
      return relatedRelation?.collection || null;
    });

    const relatedCollectionInfo = computed(() => {
      if (! relatedCollection.value) return null;
      return collectionsStore.getCollection(relatedCollection.value);
    });

    return { t, template, enableCreate, enableSelect, relatedCollection, relatedCollectionInfo };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/form-grid.scss';

.form-grid {
  @include form-grid;
}
</style>
