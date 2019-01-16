import { UserError } from 'graphql-errors';

import { QueryResolvers } from '../resolvers.types';

export function getPaginationArguments(
  pagination: QueryResolvers.Pagination
): PaginationType {
  const { first, after, last, before } = pagination;

  if (first || first === 0) {
    if (first <= 0) {
      throw new UserError('First must be a number greater than 0');
    }

    if (first > 20) {
      throw new UserError('First must be a number smaller or equal to 20');
    }

    return { first, after };
  }

  if (last || last === 0) {
    if (last <= 0) {
      throw new UserError('Last must be a number greater than 0');
    }

    if (last > 20) {
      throw new UserError('Last must be a number smaller or equal to 20');
    }

    return { last, before };
  }

  return { first: 10 };
}

type Forward = {
  first: number;
  after?: string;
};

type Backward = {
  last: number;
  before?: string;
};

type PaginationType = Forward | Backward;
