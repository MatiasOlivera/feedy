import { getSortingArguments } from '../sorting';

describe('getSortingArguments', () => {
  test("when orderBy isn't defined return null", () => {
    expect(getSortingArguments(undefined)).toBeNull();
    expect(getSortingArguments(null)).toBeNull();
  });

  test("when orderBy.field doesn't exists throw an error", () => {
    let actual = () => getSortingArguments({ direction: 'ASC' });
    expect(actual).toThrow(/^Sorting: Field must be specified$/);

    actual = () => getSortingArguments({});
    expect(actual).toThrow(/^Sorting: Field must be specified$/);
  });

  test("when orderBy.direction doesn't exists throw an error", () => {
    const actual = () => getSortingArguments({ field: 'name' });
    expect(actual).toThrow(/^Sorting: Direction must be specified$/);
  });

  test('when orderBy is an object return a string', () => {
    const expected = 'name_ASC';
    const actual = getSortingArguments({ field: 'name', direction: 'ASC' });
    expect(actual).toBe(expected);
  });
});
