import { inject } from 'vue';
import { LAYOUT_SYMBOL } from '@/constants';

export function useLayoutState() {
  const layoutState = inject(LAYOUT_SYMBOL);

  if (! layoutState) throw new Error('[useLayoutState]: This function has to be used inside a layout component.');

  return layoutState;
}
