import formatTitle from '@/utils/format-title';

export default function translateShortcut(keys) {
  const isMac = navigator.platform.toLowerCase().startsWith('mac') || navigator.platform.startsWith('iP');

  if (isMac) {
    return keys
      .map((key) => {
        if (key === 'meta') return '⌘';
        if (key === 'option') return '⌥';
        if (key === 'shift') return '⇧';
        if (key === 'alt') return '⌥';
        return formatTitle(key);
      })
      .join('');
  } else {
    return keys
      .map((key) => {
        if (key === 'meta') return 'Ctrl';
        return formatTitle(key);
      })
      .join('+');
  }
}
