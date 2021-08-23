<template>
  <value-null v-if="displayValue === null || displayValue === undefined" />

  <span v-else class="display-formatted-text" :class="[{ bold }, font]" :style="{ color }">
    {{ displayValue }}
  </span>
</template>

<script>
import { defineComponent, computed } from 'vue';
import formatTitle from '@/utils/format-title';
import { decode } from 'html-entities';
import { useI18n } from 'vue-i18n';
import { isNil } from 'lodash';

export default defineComponent({
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    titleCase: {
      type: Boolean,
      default: false,
    },
    bold: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: null,
    },
    font: {
      type: String,
      default: 'sans-serif',
      validator: (val) => ['sans-serif', 'serif', 'monospace'].includes(val),
    },
  },
  setup(props) {
    const { n } = useI18n();

    const displayValue = computed(() => {
      if (isNil(props.value) || props.value === '') return null;

      if (typeof props.value === 'number') {
        return n(props.value);
      }

      let value = String(props.value);

      // Strip out all HTML tags
      value = value.replace(/(<([^>]+)>)/gi, '');

      // Decode any HTML encoded characters (like &copy;)
      value = decode(value);

      if (props.titleCase) {
        value = formatTitle(value);
      }

      return value;
    });

    return { displayValue };
  },
});
</script>

<style lang="scss" scoped>
.display-formatted-text {
  display: inline-block;
  overflow: hidden;
  line-height: 26px;
  white-space: nowrap;
  text-overflow: ellipsis;

  &.bold {
    font-weight: 700;
  }

  &.subdued {
    color: var(--foreground-subdued);
  }

  &.sans-serif {
    font-family: var(--family-sans-serif);
  }

  &.serif {
    font-family: var(--family-serif);
  }

  &.monospace {
    font-family: var(--family-monospace);
  }
}
</style>
