import { onMounted, onUnmounted, ref } from 'vue';

const keysDown = new Set([]);
const handlers = {};

document.body.addEventListener('keydown', (event) => {
  if (event.repeat || ! event.key) return;

  keysDown.add(mapKeys(event));

  callHandlers(event);
});

document.body.addEventListener('keyup', (event) => {
  if (event.repeat || ! event.key) return;

  keysDown.clear();
});

export default function useShortcut(
  shortcuts,
  handler,
  reference = ref(document.body),
) {
  const callback = (event, cancelNext) => {
    if (! reference.value) return;
    const ref = reference.value instanceof HTMLElement ? reference.value : reference.value.$el;

    if (
      document.activeElement === ref ||
      ref.contains(document.activeElement) ||
      document.activeElement === document.body
    ) {
      event.preventDefault();
      return handler(event, cancelNext);
    }

    return false;
  };

  onMounted(() => {
    [shortcuts].flat().forEach((shortcut) => {
      if (shortcut in handlers) {
        handlers[shortcut].unshift(callback);
      } else {
        handlers[shortcut] = [callback];
      }
    });
  });

  onUnmounted(() => {
    [shortcuts].flat().forEach((shortcut) => {
      if (shortcut in handlers) {
        handlers[shortcut] = handlers[shortcut].filter((f) => f !== callback);

        if (handlers[shortcut].length === 0) {
          delete handlers[shortcut];
        }
      }
    });
  });
}

function mapKeys(key) {
  const map = {
    Control: 'meta',
    Command: 'meta',
  };
  const isLatinAlphabet = /^[a-zA-Z0-9]*?$/g;

  let keyString = key.key.match(isLatinAlphabet) === null ? key.code.replace(/(Key|Digit)/g, '') : key.key;

  keyString = keyString in map ? map[keyString] : keyString;
  keyString = keyString.toLowerCase();

  return keyString;
}

function callHandlers(event) {
  Object.entries(handlers).forEach(([key, value]) => {
    const keys = key.split('+');

    for (key of keysDown) {
      if (keys.includes(key) === false) return;
    }

    for (key of keys) {
      if (keysDown.has(key) === false) return;
    }

    for (let i = 0; i < value.length; i++) {
      let cancel = false;

      value[i](event, () => {
        cancel = true;
      });

      // if cancelNext is called, discontinue going through the queue.
      if (typeof cancel === 'boolean' && cancel) break;
    }
  });
}
