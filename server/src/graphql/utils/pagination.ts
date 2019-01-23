import { UserError } from 'graphql-errors';
import { isEmpty } from 'lodash';

import { QueryResolvers } from '../resolvers.types';

export function getPaginationArguments(
  pagination: QueryResolvers.Pagination
): PaginationType {
  const itemsPerPage = 10;
  const defaultPagination = { first: itemsPerPage };
  const limits = { minLimit: 0, maxLimit: 20 };

  // If default pagination was not specified in the schema
  // return a fallback response
  if (!pagination || isEmpty(pagination)) return defaultPagination;

  const { first, after, last, before } = pagination;

  try {
    if (validateLimit('First', first, limits)) {
      return { first, after };
    }

    if (after) {
      return { first: itemsPerPage, after };
    }
  } catch (err) {
    throw err;
  }

  try {
    if (validateLimit('Last', last, limits)) {
      return { last, before };
    }

    if (before) {
      return { last: itemsPerPage, before };
    }
  } catch (err) {
    throw err;
  }

  return defaultPagination;
}

function validateLimit(
  fieldName: string,
  limit: number,
  limits: Limits
): boolean {
  const { minLimit, maxLimit } = limits;

  if (!(limit || limit === minLimit)) {
    return false;
  }

  if (limit <= minLimit) {
    const msg = `${fieldName} must be a number greater than ${minLimit}`;
    throw new UserError(msg);
  }

  if (limit > maxLimit) {
    const msg = `${fieldName} must be a number smaller or equal to ${maxLimit}`;
    throw new UserError(msg);
  }

  return true;
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

interface Limits {
  minLimit: number;
  maxLimit: number;
}
