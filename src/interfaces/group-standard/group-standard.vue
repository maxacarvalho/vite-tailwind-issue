<template>
  <div class="group-standard">
    <v-divider
      v-if="showHeader"
      :style="{
				'--v-divider-label-color': headerColor,
			}"
      :inline-title="false"
      large
    >
      <template v-if="headerIcon" #icon>
        <v-icon :name="headerIcon" />
      </template>
      <template v-if="field.name">
        <span class="title">{{ field.name }}</span>
      </template>
    </v-divider>

    <v-form
      :initial-values="initialValues"
      :fields="fields"
      :model-value="values"
      :primary-key="primaryKey"
      :group="field.meta.id"
      :validation-errors="validationErrors"
      :loading="loading"
      :batch-mode="batchMode"
      @update:model-value="$emit('apply', $event)"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InterfaceGroupRaw',
  props: {
    field: {
      type: Object,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    values: {
      type: Object,
      required: true,
    },
    initialValues: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    batchMode: {
      type: Boolean,
      default: false,
    },
    batchActiveFields: {
      type: Array,
      default: () => [],
    },
    primaryKey: {
      type: [Number, String],
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    validationErrors: {
      type: Array,
      default: () => [],
    },

    showHeader: {
      type: Boolean,
      default: false,
    },
    headerIcon: {
      type: String,
      default: null,
    },
    headerColor: {
      type: String,
      default: null,
    },
  },
  emits: ['apply'],
});
</script>

<style scoped>
.v-divider {
  margin-bottom: calc(var(--form-vertical-gap) / 2);
}
</style>
