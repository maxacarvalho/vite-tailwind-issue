<template>
  <collection :collection="collection">
    <template #navigation>
      <surveys-navigation />
    </template>
  </collection>
</template>

<script>
import Collection from '@/views/collections/collection.vue';

import SurveysNavigation from '../components/navigation.vue';

export default {
  components: {
    Collection,
    SurveysNavigation,
  },
  props: {
    collection: {
      type: String,
      required: false,
    },
    bookmark: {
      type: String,
      default: null,
    },
  },
};
</script>
