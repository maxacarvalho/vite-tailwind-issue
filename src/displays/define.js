export function defineDisplay(config) {
  let options;

  if (typeof config === 'function') {
    options = config();
  } else {
    options = config;
  }

  return options;
}
