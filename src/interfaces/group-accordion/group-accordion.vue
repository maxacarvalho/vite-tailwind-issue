<template>
  <v-item-group v-model="selection" scope="group-accordion" class="group-accordion" :multiple="multiple">
    <accordion-section
      v-for="accordionField in rootFields"
      :key="accordionField.field"
      :field="accordionField"
      :fields="fields"
      :values="values"
      :initial-values="initialValues"
      :disabled="disabled"
      :batch-mode="batchMode"
      :batch-active-fields="batchActiveFields"
      :primary-key="primaryKey"
      :loading="loading"
      :validation-errors="validationErrors"
      :group="field.meta.id"
      :multiple="multiple"
      @apply="$emit('apply', $event)"
      @toggleAll="toggleAll"
    />
  </v-item-group>
</template>

<script>
import { defineComponent, computed, ref, watch } from 'vue';
import AccordionSection from './accordion-section.vue';

export default defineComponent({
  name: 'InterfaceGroupAccordion',
  components: { AccordionSection },
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

    multiple: {
      type: Boolean,
      default: false,
    },
    start: {
      type: String,
      enum: ['opened', 'closed', 'first'],
      default: 'closed',
    },
  },
  emits: ['apply'],
  setup(props) {
    const rootFields = computed(() => {
      return props.fields.filter((field) => field.meta?.group === props.field.meta?.id);
    });

    const selection = ref([]);

    watch(
      () => props.start,
      (start) => {
        if (start === 'opened') {
          selection.value = rootFields.value.map((field) => field.field);
        }

        if (start === 'first') {
          selection.value = [rootFields.value[0].field];
        }
      },
      { immediate: true },
    );

    return { rootFields, selection, toggleAll };

    function toggleAll() {
      if (props.multiple === false) return;

      if (selection.value.length === rootFields.value.length) {
        selection.value = [];
      } else {
        selection.value = rootFields.value.map((field) => field.field);
      }
    }
  },
});
</script>
