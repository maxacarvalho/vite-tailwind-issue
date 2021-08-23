<template>
  <v-list-group>
    <template #activator>
      <select-list-item
        :model-value="modelValue"
        :item="item"
        :multiple="multiple"
        :allow-other="allowOther"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </template>

    <template v-for="(childItem, index) in item.children" :key="index">
      <select-list-item-group
        v-if="childItem.children"
        :item="childItem"
        :model-value="modelValue"
        :multiple="multiple"
        :allow-other="allowOther"
        @update:model-value="$emit('update:modelValue', $event)"
      />
      <select-list-item
        v-else
        :model-value="modelValue"
        :item="childItem"
        :multiple="multiple"
        :allow-other="allowOther"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </template>
  </v-list-group>
</template>

<script>
import { defineComponent } from 'vue';
import SelectListItem from './select-list-item.vue';

export default defineComponent({
  name: 'SelectListItemGroup',
  components: { SelectListItem },
  props: {
    item: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: [String, Number, Array],
      default: null,
    },
    multiple: {
      type: Boolean,
      required: true,
    },
    allowOther: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue'],
});
</script>
