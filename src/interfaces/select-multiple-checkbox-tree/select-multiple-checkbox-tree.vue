<template>
  <div class="select-multiple-checkbox-tree">
    <div class="search">
      <v-input v-model="search" class="input" type="text" :placeholder="t('search')">
        <template #prepend>
          <v-icon name="search" />
        </template>

        <template v-if="search" #append>
          <v-icon name="clear" clickable @click="search = ''" />
        </template>
      </v-input>
    </div>

    <v-checkbox-tree
      :model-value="value"
      :search="searchDebounced"
      :disabled="disabled"
      :choices="choices"
      :value-combining="valueCombining"
      @update:model-value="$emit('input', $event)"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash';
import { defineComponent, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    choices: {
      type: Array,
      default: () => [],
    },
    valueCombining: {
      type: String,
      default: 'all',
    },
  },
  emits: ['input'],
  setup() {
    const { t } = useI18n();
    const search = ref('');

    const setSearchDebounced = debounce((val) => {
      searchDebounced.value = val;
    }, 250);

    watch(search, setSearchDebounced);

    const searchDebounced = ref('');

    return { search, t, searchDebounced };
  },
});
</script>

<style scoped>
.select-multiple-checkbox-tree {
  max-height: var(--input-height-max);
  overflow: auto;
  border: var(--border-width) solid var(--border-normal);
  border-radius: var(--border-radius);
}

.search {
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 10px;
  padding-bottom: 0;
}

.search .v-input {
  box-shadow: 0 0 4px 4px var(--background-page);
}
</style>
