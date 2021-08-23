import { createPopper } from '@popperjs/core/lib/popper-lite';
import arrow from '@popperjs/core/lib/modifiers/arrow';
import computeStyles from '@popperjs/core/lib/modifiers/computeStyles';
import eventListeners from '@popperjs/core/lib/modifiers/eventListeners';
import flip from '@popperjs/core/lib/modifiers/flip';
import offset from '@popperjs/core/lib/modifiers/offset';
import popperOffsets from '@popperjs/core/lib/modifiers/popperOffsets';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';
import { onUnmounted, ref, watch } from 'vue';

export function usePopper(reference, popper, options) {
  const popperInstance = ref;
  const styles = ref({});
  const arrowStyles = ref({});

  // The internal placement can change based on the flip / overflow modifiers
  const placement = ref(options.value.placement);

  onUnmounted(() => {
    stop();
  });

  watch(
    options,
    () => {
      popperInstance.value?.setOptions({
        placement: options.value.attached ? 'bottom-start' : options.value.placement,
        modifiers: getModifiers(),
      });
    },
    { immediate: true },
  );

  const observer = new MutationObserver(() => {
    popperInstance.value?.forceUpdate();
  });

  return { popperInstance, placement, start, stop, styles, arrowStyles };

  function start() {
    return new Promise((resolve) => {
      popperInstance.value = createPopper(reference.value, popper.value, {
        placement: options.value.attached ? 'bottom-start' : options.value.placement,
        modifiers: getModifiers(resolve),
        strategy: 'fixed',
      });
      popperInstance.value.forceUpdate();
      observer.observe(popper.value, {
        attributes: false,
        childList: true,
        characterData: true,
        subtree: true,
      });
    });
  }

  function stop() {
    popperInstance.value?.destroy();
    observer.disconnect();
  }

  function getModifiers(callback) {
    const modifiers = [
      popperOffsets,
      {
        ...offset,
        options: {
          offset: options.value.attached ? [0, 0] : [0, 8],
        },
      },
      {
        ...preventOverflow,
        options: {
          padding: 8,
        },
      },
      {
        name: 'arrow',
        options: {
          padding: 6,
        },
      },
      computeStyles,
      flip,
      eventListeners,
      {
        name: 'placementUpdater',
        enabled: true,
        phase: 'afterWrite',
        fn({ state }) {
          placement.value = state.placement;
        },
      },
      {
        name: 'applyStyles',
        enabled: true,
        phase: 'write',
        fn({ state }) {
          styles.value = state.styles.popper;
          arrowStyles.value = state.styles.arrow;
          callback();
        },
      },
    ];

    if (options.value.arrow === true) {
      modifiers.push(arrow);
    }

    if (options.value.attached === true) {
      modifiers.push({
        name: 'sameWidth',
        enabled: true,
        fn: ({ state }) => {
          state.styles.popper.width = `${state.rects.reference.width}px`;
        },
        phase: 'beforeWrite',
        requires: ['computeStyles'],
      });
    }

    return modifiers;
  }
}
