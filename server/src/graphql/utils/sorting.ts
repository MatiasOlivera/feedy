import { UserError } from 'graphql-errors';

export function getSortingArguments<Enum extends string>(
  orderBy: OrderBy
): Enum {
  if (!orderBy) {
    return null;
  }

  if (!orderBy.field) {
    throw new UserError('Sorting: Field must be specified');
  }

  if (!orderBy.direction) {
    throw new UserError('Sorting: Direction must be specified');
  }

  return (`${orderBy.field}_${orderBy.direction}` as unknown) as Enum;
}

interface OrderBy {
  field: string;
  direction: 'ASC' | 'DESC';
}
