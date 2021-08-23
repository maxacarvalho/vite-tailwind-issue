<template>
  <v-notice v-if="selectedType === undefined">
    {{ t('select_field_type') }}
  </v-notice>
  <v-select
    v-else
    :items="items"
    :model-value="value"
    :placeholder="t('interfaces.system-interface.placeholder')"
    @update:model-value="$emit('input', $event)"
  />
</template>

<script>
import { useI18n } from 'vue-i18n';
import { defineComponent, computed, inject, ref, watch } from 'vue';
import { getInterfaces } from '@/interfaces';

export default defineComponent({
  props: {
    value: {
      type: String,
      default: null,
    },
    typeField: {
      type: String,
      default: null,
    },
  },
  emits: ['input'],
  setup(props, { emit }) {
    const { t } = useI18n();

    const { interfaces } = getInterfaces();

    const values = inject('values', ref({}));

    const selectedType = computed(() => {
      if (props.typeField === null || ! values.value[props.typeField]) return;
      return values.value[props.typeField];
    });

    watch(
      () => values.value[props.typeField],
      () => {
        emit('input', null);
      },
    );

    const items = computed(() => {
      return interfaces.value
        .filter((inter) => inter.relational !== true && inter.system !== true)
        .filter(
          (inter) => selectedType.value === undefined || inter.types.includes(selectedType.value),
        )
        .map((inter) => {
          return {
            text: inter.name,
            value: inter.id,
          };
        });
    });

    return { t, items, selectedType, values };
  },
});
</script>
