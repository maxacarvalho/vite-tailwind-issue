<template>
  <v-item-group class="v-tabs-items" :model-value="modelValue" @update:model-value="update">
    <slot />
  </v-item-group>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: Array,
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    function update(newSelection) {
      emit('update:modelValue', newSelection);
    }

    return { update };
  },
});
</script>
