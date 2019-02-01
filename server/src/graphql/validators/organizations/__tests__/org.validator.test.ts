import { runTestCases, TestCase } from '../../__tests__/__utils__/factory.validator';
import OrganizationValidator from '../org.validator';

const name = 'OrganizationValidator';
const validator = OrganizationValidator;
const cases: Array<TestCase> = [
  {
    name: 'the validation should pass when is an empty object',
    data: {
      name: null,
      bio: null
    },
    expected: {}
  },
  {
    name: 'the validation should pass when is a valid object',
    data: {
      name: 'Google',
      bio: "Don't be evil"
    },
    expected: {}
  }
];

runTestCases(name, validator, cases);
