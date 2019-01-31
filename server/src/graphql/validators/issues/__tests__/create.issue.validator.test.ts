import { existsRuleMock } from '../../__tests__/__mocks__/custom.rules.mocks';
import { runTestCases, TestCase } from '../../__tests__/__utils__/factory.validator';
import CreateIssueValidator from '../create.issue.validator';

const name = 'CreateIssueValidator';
const validator = CreateIssueValidator;
const cases: Array<TestCase> = [
  {
    name: 'the validation should fail when is an empty object',
    data: {
      title: null,
      body: null,
      userId: null,
      productId: null
    },
    expected: {
      body: 'The body field is required.',
      productId: 'The productId field is required.',
      title: 'The title field is required.',
      userId: 'The userId field is required.'
    }
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
