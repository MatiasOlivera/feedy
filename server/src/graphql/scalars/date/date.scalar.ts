import { Kind } from 'graphql/language';
import { UserError } from 'graphql-errors';

function validateDate(value: string): void {
  const date = Date.parse(value);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(date)) {
    throw new UserError('Not a valid date');
  }
}

const DateScalar = {
  parseValue(value: string) {
    validateDate(value);
    return new Date(value);
  },

  parseLiteral(ast: any) {
    if (ast.kind !== Kind.STRING) {
      throw new UserError('Can only parse dates strings');
    }

    validateDate(ast.value);
    return new Date(ast.value);
  },

  serialize(value: Date) {
    return value.toJSON();
  }
};

export default { Date: DateScalar };
