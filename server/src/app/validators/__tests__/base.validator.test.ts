import BaseValidator from '../base.validator';
import { isOfLegalAgeAsync, isOfLegalAgeSync } from './__mocks__/custom.rules.mocks';

test('should create an instance of base validator', () => {
  const createValidator = () => new BaseValidator();
  expect(createValidator).not.toThrow();
});

test('should return an empty rules object', () => {
  const validator = new BaseValidator();
  const rules = validator.rules();
  expect(rules).toEqual({});
});

describe('registerCustomRule()', () => {
  test('should register and use a sync custom rule', async () => {
    // register the rule
    const validator = new BaseValidator();
    const register = () => validator.registerCustomRule(isOfLegalAgeSync);
    expect(register).not.toThrow();

    // use the rule
    class PersonValidator extends BaseValidator {
      // eslint-disable-next-line class-methods-use-this
      rules() {
        return { age: 'isOfLegalAgeSync:18' };
      }
    }

    try {
      const personValidator = new PersonValidator();
      await personValidator.validate({ age: 17 });
    } catch (error) {
      expect(error).toEqual({ age: 'It is not of legal age' });
    }
  });

  test('should register and use an async custom rule', async () => {
    // register the rule
    const validator = new BaseValidator();
    const register = () => validator.registerCustomRule(isOfLegalAgeAsync);
    expect(register).not.toThrow();

    // use the rule
    class PersonValidator extends BaseValidator {
      // eslint-disable-next-line class-methods-use-this
      rules() {
        return { age: 'isOfLegalAgeAsync:18' };
      }
    }

    try {
      const personValidator = new PersonValidator();
      await personValidator.validate({ age: 17 });
    } catch (error) {
      expect(error).toEqual({ age: 'It is not of legal age' });
    }
  });
});

describe('registerCustomRules()', () => {
  test('should register several rules', () => {
    const validator = new BaseValidator();
    const rules = [isOfLegalAgeSync, isOfLegalAgeAsync];
    const register = () => validator.registerCustomRules(rules);
    expect(register).not.toThrow();
  });
});

describe('validate()', () => {
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
