exports.isNotEmpty = function isNotNull(name, value) {
  if (!value) {
    throw new Error(`${name} is required.`);
  }
};

exports.assert = function assert(name, value, validate) {
  return validate(name, value);
};
