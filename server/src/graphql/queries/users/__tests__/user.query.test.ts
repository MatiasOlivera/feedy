import gql from 'gql-tag';

import { userDatabaseMock, userMock } from '../../../__tests__/__mocks__/users.mocks';
import request from '../../../__tests__/__utils__/request';
import { QueryResolvers } from '../../../resolvers.types';

test('Get user by ID', async () => {
  const query = gql`
    query getUser($id: ID!) {
      user(id: $id) {
        id
        firstName
        lastName
        fullName
        gender
        username
        email
        bio
        createdAt
        updatedAt
        deletedAt
      }
    }
  `;
  const variables: QueryResolvers.ArgsUser = { id: userMock.id };
  const context = { db: { user: jest.fn(() => userDatabaseMock) } };

  const result = await request(query, variables, context);
  const expected = { data: { user: userMock } };

  expect(result).toEqual(expected);
});
