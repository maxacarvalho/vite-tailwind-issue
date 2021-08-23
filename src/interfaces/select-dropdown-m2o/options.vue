<template>
  <v-notice v-if="collection === null" class="full" type="warning">
    {{ t('interfaces.list-o2m.no_collection') }}
  </v-notice>
  <div v-else class="form-grid">
    <div class="field full">
      <p class="type-label">{{ t('interfaces.select-dropdown-m2o.display_template') }}</p>
      <v-field-template v-model="template" :collection="relatedCollection" :depth="2"></v-field-template>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { defineComponent, computed } from 'vue';

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
  },
  emits: ['input'],
  setup(props, { emit }) {
    const { t } = useI18n();

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

    const relatedCollection = computed(() => {
      if (! props.fieldData || ! props.relations || props.relations.length === 0) return null;
      const { field } = props.fieldData;
      const relation = props.relations.find(
        (relation) => relation.collection === props.collection && relation.field === field,
      );
      return relation?.related_collection || null;
    });

    return { t, template, relatedCollection };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/form-grid';

.form-grid {
  @include form-grid;
}
</style>
