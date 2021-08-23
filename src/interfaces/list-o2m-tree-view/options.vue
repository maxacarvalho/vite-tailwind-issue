<template>
  <v-notice v-if="collection === null" class="full" type="warning">
    {{ t('interfaces.list-o2m.no_collection') }}
  </v-notice>
  <div v-else class="form-grid">
    <div class="field full">
      <p class="type-label">{{ t('interfaces.select-dropdown-m2o.display_template') }}</p>
      <v-field-template v-model="template" :collection="collection" :depth="1"></v-field-template>
    </div>

    <div class="field half-left">
      <p class="type-label">{{ t('creating_items') }}</p>
      <v-checkbox v-model="enableCreate" block :label="t('enable_create_button')" />
    </div>

    <div class="field half-right">
      <p class="type-label">{{ t('selecting_items') }}</p>
      <v-checkbox v-model="enableSelect" block :label="t('enable_select_button')" />
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
        return props.value?.displayTemplate;
      },
      set(newTemplate) {
        emit('input', {
          ...(props.value || {}),
          displayTemplate: newTemplate,
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

    return { t, template, enableCreate, enableSelect };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/form-grid';

.form-grid {
  @include form-grid;
}
</style>
