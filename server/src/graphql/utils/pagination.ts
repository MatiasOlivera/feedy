import { UserError } from 'graphql-errors';

export function getPaginationArguments(args: Args): Pagination {
  const { first, after, last, before } = args;

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

interface Args {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
}

type Forward = {
  first: number;
  after?: string;
};

type Backward = {
  last: number;
  before?: string;
};

type Pagination = Forward | Backward;
