import gql from 'gql-tag';

import { issueMock } from '../../../__tests__/__mocks__/issues.mocks';
import request from '../../../__tests__/__utils__/request';
import { QueryResolvers } from '../../../resolvers.types';

test('Get issue by ID', async () => {
  const query = gql`
    query getIssue($id: ID!) {
      issue(id: $id) {
        id
        title
        body
        createdAt
        updatedAt
        deletedAt
      }
    }
  `;
  const variables: QueryResolvers.ArgsIssue = { id: issueMock.id };
  const context = { db: { issue: jest.fn(() => issueMock) } };

  const result = await request(query, variables, context);
  const expected = { data: { issue: issueMock } };

  expect(result).toEqual(expected);
});
