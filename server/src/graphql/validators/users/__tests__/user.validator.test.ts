import { runTestCases, TestCase } from '../../__tests__/__utils__/factory.validator';
import UserValidator from '../user.validator';

const name = 'UserValidator';
const validator = UserValidator;
const cases: Array<TestCase> = [
  {
    name: 'the validation should pass when is an empty object',
    data: {
      firstName: null,
      lastName: null,
      gender: null,
      username: null,
      email: null,
      bio: null
    },
    expected: {}
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
    expected: {}
  }
];

runTestCases(name, validator, cases);
