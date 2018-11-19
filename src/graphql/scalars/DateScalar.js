const { Kind } = require('graphql/language');

function validateDate(value) {
  const date = Date.parse(value);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(date)) {
    throw new Error('Not a valid date');
  }
}

const DateScalar = {
  parseValue(value) {
    validateDate(value);
    return new Date(value);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new Error('Can only parse dates strings');
    }

    validateDate(ast.value);
    return new Date(ast.value);
  },

  serialize(value) {
    return value.toJSON();
  }
};

module.exports = DateScalar;
