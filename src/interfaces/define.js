export function defineInterface(config) {
  let options;

  if (typeof config === 'function') {
    options = config();
  } else {
    options = config;
  }

  return options;
}
