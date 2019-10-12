export const Types = {
  object: '[object Object]',
  array: '[object Array]',
  string: '[object String]',
  number: '[object Number]',
};

export const TypeOf = obj => Object.prototype.toString.call(obj);
