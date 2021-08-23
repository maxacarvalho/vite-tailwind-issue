import extensions from './extensions.json';
import types from './types.json';

export default function readableMimeType(type, extension = false) {
  if (extension) {
    return (extensions)[type] || null;
  }

  return (types)[type] || null;
}
