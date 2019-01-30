import { runTestCases, TestCase } from '../../__tests__/__utils__/factory.validator';
import CommentValidator from '../comment.validator';

const name = 'CommentValidator';
const validator = CommentValidator;
const cases: Array<TestCase> = [
  {
    name: 'The body field should be required',
    data: { body: '' },
    expected: { body: 'The body field is required.' }
  },
  {
    name: 'The body field should be valid',
    data: { body: 'I agree. +1' },
    expected: {}
  }
];

runTestCases(name, validator, cases);
