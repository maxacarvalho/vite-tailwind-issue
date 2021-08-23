export function defineLayout(config) {
  let options;

  if (typeof config === 'function') {
    const context = {};
    options = config(context);
  } else {
    options = config;
  }

  return options;
}
