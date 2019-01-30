import { MutationResolvers } from '../../../resolvers.types';
import { runTestCases, TestCase } from '../../__tests__/__utils__/factory.validator';
import UpdateCommentValidator from '../update.comment.validator';

const name = 'UpdateCommentValidator';
const validator = UpdateCommentValidator;
const cases: Cases = [
  {
    name: 'the validation should fail when is an empty object',
    data: {
      body: null,
      parentId: null,
      userId: null,
      issueId: null
    },
    expected: { body: 'The body field is required.' }
  },
  {
    name: 'the validation should pass when is a valid object',
    data: {
      body: 'I agree. +1',
      parentId: 'id',
      userId: 'id',
      issueId: 'id'
    },
    expected: {}
  }
];

type Cases = Array<TestCase<MutationResolvers.CreateCommentInput>>;

runTestCases(name, validator, cases);
