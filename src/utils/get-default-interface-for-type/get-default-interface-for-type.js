const defaultInterfaceMap = {
  alias: 'input',
  bigInteger: 'input',
  binary: 'input',
  boolean: 'boolean',
  date: 'datetime',
  dateTime: 'datetime',
  decimal: 'input',
  float: 'input',
  integer: 'input',
  json: 'input-code',
  string: 'input',
  text: 'input-multiline',
  time: 'datetime',
  timestamp: 'datetime',
  uuid: 'input',
  unknown: 'input',
  csv: 'tags',
  hash: 'input-hash',
};

export function getDefaultInterfaceForType(type) {
  return defaultInterfaceMap[type] || 'input';
}
