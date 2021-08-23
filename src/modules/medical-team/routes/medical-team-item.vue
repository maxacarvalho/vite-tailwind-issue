<template>
  <collection-item :collection="collection" :primary-key="primaryKey" :singleton="singleton">
    <template #navigation>
      <surveys-navigation />
    </template>
  </collection-item>
</template>

<script>
import CollectionItem from '@/views/collections/item.vue'

import SurveysNavigation from '../components/navigation.vue';

export default {
  components: {
    CollectionItem,
    SurveysNavigation,
  },
  props: {
    collection: {
      type: String,
      required: true,
    },
    primaryKey: {
      type: String,
      default: null,
    },
    singleton: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
