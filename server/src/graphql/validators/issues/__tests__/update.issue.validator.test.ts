import { existsRuleMock } from '../../__tests__/__mocks__/custom.rules.mocks';
import { runTestCases, TestCase } from '../../__tests__/__utils__/factory.validator';
import UpdateIssueValidator from '../update.issue.validator';

const name = 'UpdateIssueValidator';
const validator = UpdateIssueValidator;
const cases: Array<TestCase> = [
  {
    name: 'the validation should pass when is an empty object',
    data: {
      title: null,
      body: null,
      userId: null,
      productId: null
    },
    expected: {}
  },
  {
    name: 'the validation should pass when is a valid object',
    data: {
      title: 'Feature request',
      body: 'I would be nice..',
      userId: 'id',
      productId: 'id'
    },
    expected: {},
    customRules: [existsRuleMock]
  }
];

runTestCases(name, validator, cases);
