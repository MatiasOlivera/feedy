import { UserError } from 'graphql-errors';

import { QueryResolvers } from '../resolvers.types';

export function getPaginationArguments(
  pagination: QueryResolvers.Pagination
): PaginationType {
  const { first, after, last, before } = pagination;
  const minLimit = 0;
  const maxLimit = 20;

  if (first || first === minLimit) {
    if (first <= minLimit) {
      throw new UserError(`First must be a number greater than ${minLimit}`);
    }

    if (first > maxLimit) {
      throw new UserError(
        `First must be a number smaller or equal to ${maxLimit}`
      );
    }

    return { first, after };
  }

  if (last || last === minLimit) {
    if (last <= minLimit) {
      throw new UserError(`Last must be a number greater than ${minLimit}`);
    }

    if (last > maxLimit) {
      throw new UserError(
        `Last must be a number smaller or equal to ${maxLimit}`
      );
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
