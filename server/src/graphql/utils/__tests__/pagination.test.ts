import { QueryResolvers } from '../../resolvers.types';
import { getPaginationArguments } from '../pagination';

describe('getPaginationArguments', () => {
  const defaultPagination = { first: 10 };
  const pagination: QueryResolvers.Pagination = {
    first: null,
    after: null,
    last: null,
    before: null
  };

  test('when the argument is null or an empty object', () => {
    expect(getPaginationArguments(null)).toEqual(defaultPagination);
    expect(getPaginationArguments({})).toEqual(defaultPagination);
  });

  test('when the argument is an object with null values', () => {
    const actual = getPaginationArguments(pagination);
    expect(actual).toEqual(defaultPagination);
  });

  test('when "first" is less than or equal to minimum limit throw an error', () => {
    const smaller = () =>
      getPaginationArguments({
        ...pagination,
        first: -1,
        after: 'cursor'
      });
    expect(smaller).toThrow(/^First must be a number greater than 0$/);

    const equal = () =>
      getPaginationArguments({
        ...pagination,
        first: 0,
        after: 'cursor'
      });
    expect(equal).toThrow(/^First must be a number greater than 0$/);
  });

  test('when "first" is greater than maximum limit throw an error', () => {
    const actual = () =>
      getPaginationArguments({
        ...pagination,
        first: 25,
        after: 'cursor'
      });
    expect(actual).toThrow(/^First must be a number smaller or equal to 20$/);
  });

  test('when only "first" is specified', () => {
    const expected: { first: number; after: string } = {
      first: 5,
      after: null
    };
    const actual = getPaginationArguments({ ...pagination, ...expected });
    expect(actual).toEqual(expected);
  });

  test('when only "after" is specified', () => {
    const expected = { first: 10, after: 'cursor' };
    const actual = getPaginationArguments({ ...pagination, after: 'cursor' });
    expect(actual).toEqual(expected);
  });

  test('when "first" and "after" are specified returns forward pagination', () => {
    const expected = { first: 5, after: 'cursor' };
    const actual = getPaginationArguments({ ...pagination, ...expected });
    expect(actual).toEqual(expected);
  });

  test('when "last" is less than  or equal to minimum limit throw an error', () => {
    const smaller = () =>
      getPaginationArguments({
        ...pagination,
        last: -1,
        before: 'cursor'
      });
    expect(smaller).toThrow(/^Last must be a number greater than 0$/);

    const equal = () =>
      getPaginationArguments({
        ...pagination,
        last: 0,
        before: 'cursor'
      });
    expect(equal).toThrow(/^Last must be a number greater than 0$/);
  });

  test('when "last" is greater than maximum limit throw an error', () => {
    const actual = () =>
      getPaginationArguments({
        ...pagination,
        last: 25,
        before: 'cursor'
      });
    expect(actual).toThrow(/^Last must be a number smaller or equal to 20$/);
  });

  test('when only "last" is specified', () => {
    const expected: { last: number; before: string } = {
      last: 5,
      before: null
    };
    const actual = getPaginationArguments({ ...pagination, last: 5 });
    expect(actual).toEqual(expected);
  });

  test('when only "before" is specified', () => {
    const expected = { last: 10, before: 'cursor' };
    const actual = getPaginationArguments({ ...pagination, before: 'cursor' });
    expect(actual).toEqual(expected);
  });

  test('when "last" and "before" are specified returns backward pagination', () => {
    const expected = { last: 5, before: 'cursor' };
    const actual = getPaginationArguments({ ...pagination, ...expected });
    expect(actual).toEqual(expected);
  });
});
