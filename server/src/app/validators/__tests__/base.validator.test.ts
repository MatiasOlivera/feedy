import BaseValidator from '../base.validator';

test('should create an instance of base validator', () => {
  const createValidator = () => new BaseValidator();
  expect(createValidator).not.toThrow();
});

test('should return an empty rules object', () => {
  const validator = new BaseValidator();
  const rules = validator.rules();
  expect(rules).toEqual({});
});

describe('Validate()', () => {
  class PersonValidator extends BaseValidator {
    // eslint-disable-next-line class-methods-use-this
    rules() {
      return {
        name: 'required|string',
        age: 'required|integer',
        profession: 'string'
      };
    }
  }

  const validator = new PersonValidator();

  test('should pass the sync validation', async () => {
    const person = { name: 'John', age: 25 };
    const messages = await validator.validate(person);
    expect(messages).toBeUndefined();
  });

  test('should fails the sync validation', async () => {
    try {
      const person = { name: 1234, age: 'John' };
      await validator.validate(person);
    } catch (error) {
      const errors = {
        age: 'The age must be an integer.',
        name: 'The name must be a string.'
      };
      expect(error).toEqual(errors);
    }
  });
});
