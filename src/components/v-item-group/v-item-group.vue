<template>
  <div class="v-item-group">
    <slot />
  </div>
</template>

<script>
import { defineComponent, toRefs } from 'vue';
import { useGroupableParent } from '@/composables/groupable';

export default defineComponent({
  props: {
    mandatory: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: -1,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Array,
      default: undefined,
    },
    scope: {
      type: String,
      default: 'item-group',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { modelValue: selection, multiple, max, mandatory } = toRefs(props);
    useGroupableParent(
      {
        selection: selection,
        onSelectionChange: (newSelectionValues) => emit('update:modelValue', newSelectionValues),
      },
      {
        multiple: multiple,
        max: max,
        mandatory: mandatory,
      },
      props.scope,
    );
    return {};
  },
});
</script>
