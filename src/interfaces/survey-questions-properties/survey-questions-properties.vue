<template>
  <div class="form">
    <div class="field half">
      <v-checkbox
        block
        :label="t('allow_select_multiple')"
        :model-value="value.multiple_selection"
        @update:model-value="updateProperty('multiple_selection', $event)"
      />
    </div>

    <div class="field half-right">
      <v-checkbox
        block
        :label="t('allow_other_option')"
        :model-value="value.other_option"
        @update:model-value="updateProperty('other_option', $event)"
      />
    </div>

    <div class="field half">
      <div class="label type-label">{{ t('mask_select_label') }}</div>
      <v-select
        :model-value="value.mask"
        :items="maskTypesWithLabels"
        :placeholder="t('mask_select_label')"
        @update:model-value="updateProperty('mask', $event)"
      />
    </div>

    <div class="field half-right">
      <div class="label type-label">{{ t('mask_pattern_label') }}</div>
      <v-input
        :model-value="value.mask_pattern"
        :placeholder="t('mask_pattern_label')"
        :trim="true"
        type="text"
        @update:model-value="updateProperty('mask_pattern', $event)"
      />
    </div>

    <div class="field half">
      <div class="label type-label">{{ t('initial_value_label') }}</div>
      <v-input
        :model-value="value.initial_value"
        :placeholder="t('initial_value_label')"
        :trim="true"
        type="text"
        @update:model-value="updateProperty('initial_value', $event)"
      />
    </div>

    <div class="field half-right">
      <div class="label type-label">{{ t('placeholder_label') }}</div>
      <v-input
        :model-value="value.placeholder"
        :placeholder="t('placeholder_label')"
        :trim="true"
        type="text"
        @update:model-value="updateProperty('placeholder', $event)"
      />
    </div>

    <div class="field full">
      <div class="label type-label">{{ t('error_message_label') }}</div>
      <v-input
        :model-value="value.error_message"
        :placeholder="t('error_message_label')"
        :trim="true"
        type="text"
        @update:model-value="updateProperty('error_message', $event)"
      />
    </div>

    <div class="field half">
      <div class="label type-label">{{ t('minor_unit_factor_label') }}</div>
      <v-input
        :model-value="value.minor_unit_factor"
        :placeholder="t('minor_unit_factor_label')"
        :trim="true"
        type="number"
        @update:model-value="updateProperty('minor_unit_factor', $event)"
      />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { i18n } from '@/lang';

export const maskTypes = [
  {
    text: i18n.global.t('mask_general'),
    value: 'general',
  },
  {
    text: i18n.global.t('mask_currency'),
    value: 'currency',
  },
];

export default defineComponent({
  props: {
    value: {
      type: Object,
      default: () => ({
        'multiple_selection': false,
        'other_option': false,
        'start_at_one': false,
        'steps': 0,
        'mask': '',
        'prefix': '',
        'suffix': '',
        'precision': 2,
        'allow_negative': false,
        'mask_pattern': '',
        'placeholder': '',
        'minor_unit_factor': 1,
      }),
    },
  },
  emits: ['input'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const { value } = toRefs(props);

    const maskTypesWithLabels = computed(() => {
      return maskTypes;
    });

    return {
      t,
      value,
      updateProperty,
      maskTypesWithLabels,
    };

    function updateProperty(key, newVal) {
      value.value[key] = newVal;

      emitValue(value);
    }

    function emitValue(value) {
      return emit('input', value);
    }
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixins/form-grid";

.form {
  padding: 20px 0;

  @include form-grid;
}
</style>
