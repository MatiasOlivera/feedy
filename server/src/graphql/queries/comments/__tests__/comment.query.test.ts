import gql from 'gql-tag';

import { commentMock } from '../../../__tests__/__mocks__/comments.mocks';
import request from '../../../__tests__/__utils__/request';
import { QueryResolvers } from '../../../resolvers.types';

test('Get comment by ID', async () => {
  const query = gql`
    query getComment($id: ID!) {
      comment(id: $id) {
        id
        body
        createdAt
        updatedAt
        deletedAt
      }
    }
  `;
  const variables: QueryResolvers.ArgsComment = { id: commentMock.id };
  const context = { db: { comment: jest.fn(() => commentMock) } };

  const result = await request(query, variables, context);
  const expected = { data: { comment: commentMock } };

  expect(result).toEqual(expected);
});
