import { computed, provide, reactive } from 'vue';
import { getLayouts } from '@/layouts';
import { LAYOUT_SYMBOL } from '@/constants';

export default function useLayout(layoutName, props) {
  const { layouts } = getLayouts();

  const setupLayouts = layouts.value.reduce(
    (acc, { id, setup }) => ({ ...acc, [id]: setup(props) }),
    {},
  );

  const layoutState = computed(() => {
    const setupResult = setupLayouts[layoutName.value];

    return reactive({ ...setupResult, props });
  });

  provide(LAYOUT_SYMBOL, layoutState);

  return layoutState;
}
