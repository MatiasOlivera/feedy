import { MutationResolvers } from '../../../resolvers.types';
import { existsRuleMock } from '../../__tests__/__mocks__/custom.rules.mocks';
import { runTestCases, TestCase } from '../../__tests__/__utils__/factory.validator';
import CreateCommentValidator from '../create.comment.validator';

const name = 'CreateCommentValidator';
const validator = CreateCommentValidator;
const cases: Cases = [
  {
    name: 'the validation should fail when is an empty object',
    data: {
      body: null,
      parentId: null,
      userId: null,
      issueId: null
    },
    expected: {
      body: 'The body field is required.',
      issueId: 'The issueId field is required.',
      userId: 'The userId field is required.'
    }
  },
  {
    name: 'the validation should pass when is a valid object',
    data: {
      body: 'I agree. +1',
      parentId: 'id',
      userId: 'id',
      issueId: 'id'
    },
    expected: {},
    customRules: [existsRuleMock]
  }
];

type Cases = Array<TestCase<MutationResolvers.CreateCommentInput>>;

runTestCases(name, validator, cases);
