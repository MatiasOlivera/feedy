import { uniqueRuleMock } from '../../__tests__/__mocks__/custom.rules.mocks';
import { runTestCases, TestCase } from '../../__tests__/__utils__/factory.validator';
import CreateUserValidator from '../create.user.validator';

const name = 'CreateUserValidator';
const validator = CreateUserValidator;
const cases: Array<TestCase> = [
  {
    name: 'the validation should fail when is an empty object',
    data: {
      firstName: null,
      lastName: null,
      gender: null,
      username: null,
      email: null,
      bio: null
    },
    expected: {
      firstName: 'The firstName field is required.',
      lastName: 'The lastName field is required.',
      gender: 'The gender field is required.',
      username: 'The username field is required.',
      password: 'The password field is required.',
      email: 'The email field is required.'
    }
  },
  {
    name: 'the validation should pass when is a valid object',
    data: {
      firstName: 'Matías',
      lastName: 'Olivera',
      gender: 'Male',
      username: 'MatiasOlivera',
      password: 'graphql-is-awesome',
      email: 'MatiasOlivera@mail.com',
      bio: null
    },
    expected: {},
    customRules: [uniqueRuleMock]
  }
];

runTestCases(name, validator, cases);
