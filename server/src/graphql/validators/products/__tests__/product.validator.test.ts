import { runTestCases, TestCase } from '../../__tests__/__utils__/factory.validator';
import ProductValidator from '../product.validator';

const name = 'ProductValidator';
const validator = ProductValidator;
const cases: Array<TestCase> = [
  {
    name: 'the validation should pass when is an empty object',
    data: {
      name: null,
      description: null,
      ownerId: null
    },
    expected: {}
  },
  {
    name: 'the validation should pass when is a valid object',
    data: {
      name: 'Feedly',
      description: ' A collaborative feedback app',
      ownerId: 'id'
    },
    expected: {}
  }
];

runTestCases(name, validator, cases);
