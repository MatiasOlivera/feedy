import { uniqueRuleMock } from '../../__tests__/__mocks__/custom.rules.mocks';
import { runTestCases, TestCase } from '../../__tests__/__utils__/factory.validator';
import CreateOrganizationValidator from '../create.org.validator';

const name = 'CreateOrganizationValidator';
const validator = CreateOrganizationValidator;
const cases: Array<TestCase> = [
  {
    name: 'the validation should fail when is an empty object',
    data: {
      name: null,
      bio: null
    },
    expected: { name: 'The name field is required.' }
  },
  {
    name: 'the validation should pass when is a valid object',
    data: {
      name: 'Google',
      bio: "Don't be evil"
    },
    expected: {},
    customRules: [uniqueRuleMock]
  }
];

runTestCases(name, validator, cases);
