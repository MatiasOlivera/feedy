import { Kind } from 'graphql/language';

import { DateScalar, validateDate } from '../date/date.scalar';

describe('validateDate', () => {
  test('should throw an error when the value is an invalid date', () => {
    expect(() => validateDate('yyyy-mm-dd')).toThrow('Not a valid date');
  });

  test('should return nothing when the value is a date string', () => {
    expect(validateDate('2020-01-01')).toBeUndefined();
  });
});

describe('DateScalar', () => {
  describe('parseValue', () => {
    test('should return a date when the value is a date string', () => {
      const expected = new Date('2020-01-01T00:00:00.000Z');
      const actual = DateScalar.parseValue('2020-01-01');
      expect(actual).toEqual(expected);
    });
  });

  describe('parseLiteral', () => {
    test('should return a date when the value is a date string', () => {
      const expected = new Date('2020-01-01T00:00:00.000Z');
      const ast = { kind: Kind.STRING, value: '2020-01-01' };
      const actual = DateScalar.parseLiteral(ast);
      expect(actual).toEqual(expected);
    });

    test('should throw an error when the value is an invalid date', () => {
      const ast = { kind: Kind.INT, value: 2020 };
      const actual = () => DateScalar.parseLiteral(ast);
      expect(actual).toThrow(/^Can only parse dates strings$/);
    });
  });
});
