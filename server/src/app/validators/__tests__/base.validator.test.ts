import BaseValidator from '../base.validator';

test('should create an instance of base validator', () => {
  const createValidator = () => new BaseValidator({});
  expect(createValidator).not.toThrow();
});

test('should return an empty rules object', () => {
  const validator = new BaseValidator({});
  const rules = validator.rules();
  expect(rules).toEqual({});
});
