import { Deleted, getDeletedArgument } from '../filter.deleted';

describe('getDeletedArgument', () => {
  test('filter soft deleted instances', () => {
    const expected: Deleted = { deletedAt_not: null };
    const actual = getDeletedArgument(true);

    expect(actual).toEqual(expected);
  });

  test('filter active instances', () => {
    const expected: Deleted = { deletedAt: null };
    const actual = getDeletedArgument(false);

    expect(actual).toEqual(expected);
  });
});
