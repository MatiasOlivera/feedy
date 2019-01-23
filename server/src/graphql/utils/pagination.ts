import { UserError } from 'graphql-errors';
import { isEmpty } from 'lodash';

import { QueryResolvers } from '../resolvers.types';

export function getPaginationArguments(
  pagination: QueryResolvers.Pagination
): PaginationType {
  const itemsPerPage = 10;
  const defaultPagination = { first: itemsPerPage };

  // If default pagination was not specified in the schema
  // return a fallback response
  if (!pagination || isEmpty(pagination)) return defaultPagination;

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

  if (after) {
    return { first: itemsPerPage, after };
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

  if (before) {
    return { last: itemsPerPage, before };
  }

  return defaultPagination;
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
