<template>
  <div class="form">
    <div class="field half">
      <v-checkbox
        block
        :label="t('required')"
        :model-value="value.required"
        @update:model-value="updateProperty('required', $event)"
      />
    </div>

    <div class="field half-right"></div>

    <div class="field half">
      <div class="label type-label">{{ t('min_selection_label') }}</div>
      <v-input
        :model-value="value.min_selection"
        :placeholder="t('min_selection_label')"
        :trim="true"
        type="number"
        @update:model-value="updateProperty('min_selection', $event)"
      />
    </div>

    <div class="field half-right">
      <div class="label type-label">{{ t('max_selection_label') }}</div>
      <v-input
        :model-value="value.max_selection"
        :placeholder="t('max_selection_label')"
        :trim="true"
        type="number"
        @update:model-value="updateProperty('max_selection', $event)"
      />
    </div>

    <div class="field half">
      <div class="label type-label">{{ t('min_value_label') }}</div>
      <v-input
        :model-value="value.min_value"
        :placeholder="t('min_value_label')"
        :trim="true"
        type="number"
        @update:model-value="updateProperty('min_value', $event)"
      />
    </div>

    <div class="field half-right">
      <div class="label type-label">{{ t('max_value_label') }}</div>
      <v-input
        :model-value="value.max_value"
        :placeholder="t('max_value_label')"
        :trim="true"
        type="number"
        @update:model-value="updateProperty('max_value', $event)"
      />
    </div>

    <div class="field half">
      <div class="label type-label">{{ t('max_length_label') }}</div>
      <v-input
        :model-value="value.max_length"
        :placeholder="t('max_length_label')"
        :trim="true"
        type="number"
        @update:model-value="updateProperty('max_length', $event)"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  props: {
    value: {
      type: Object,
      default: () => ({
        'required': false,
        'min_selection': 0,
        'max_selection': 0,
        'min_value': 0,
        'max_value': 0,
        'max_length': 0,
      }),
    },
  },
  emits: ['input'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const { value } = toRefs(props);

    return {
      t,
      value,
      updateProperty,
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
