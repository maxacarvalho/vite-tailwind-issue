import { watch } from 'vue';

const beforeMount = (el, { value }) => {
  const { handler, middleware, events, disabled } = processValue(value);

  watch(
    () => value,
    (newVal) => {
      if (JSON.stringify(newVal) !== JSON.stringify(value)) {
        updated(el, { value: newVal, oldValue: null });
      }
    },
  );

  if (disabled === true) return;

  el.$clickOutsideHandlers = events.map((event) => ({
    event,
    handler: (event) => onEvent({ event, el, handler, middleware }),
  }));

  el.$clickOutsideHandlers.forEach(({ event, handler }) => {
    setTimeout(() => {
      if (! el.$clickOutsideHandlers) return;
      document.documentElement.addEventListener(event, handler, false);
    });
  });
};

const unmounted = (el) => {
  const handlers = el.$clickOutsideHandlers || [];

  handlers.forEach(({ event, handler }) => {
    document.documentElement.removeEventListener(event, handler, false);
  });
};

const updated = (el, { value, oldValue }) => {
  if (JSON.stringify(value) === JSON.stringify(oldValue)) {
    return;
  }

  unmounted(el);
  beforeMount(el, { value });
};

export const directive = {
  beforeMount,
  unmounted,
  updated,
};

export default directive;

export function processValue(bindingValue) {
  const isFunction = typeof bindingValue === 'function';

  let value;

  if (isFunction) {
    value = {
      handler: bindingValue,
      middleware: () => true,
      events: ['pointerdown'],
      disabled: false,
    };
  } else {
    const binding = bindingValue;

    value = {
      handler: binding.handler || (() => undefined),
      middleware: binding.middleware || (() => true),
      events: binding.events || ['pointerdown'],
      disabled: binding.disabled !== undefined ? !! binding.disabled : false,
    };
  }

  return value;
}

export function onEvent({ el, event, handler, middleware }) {
  event.stopPropagation();
  const path = event.composedPath();
  const isClickOutside = path ? path.indexOf(el) < 0 : el.contains(event.target) === false;

  if (isClickOutside === false) return;

  if (middleware(event)) {
    handler(event);
  }
}
