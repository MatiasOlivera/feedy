import { UserError } from 'graphql-errors';
import { Kind } from 'graphql/language';

export function validateDate(value: string): void {
  const date = Date.parse(value);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(date)) {
    throw new UserError('Not a valid date');
  }
}

export const DateScalar = {
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
  }
};

export default { Date: DateScalar };
