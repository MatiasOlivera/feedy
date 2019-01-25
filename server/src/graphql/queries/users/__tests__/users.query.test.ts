import gql from 'gql-tag';

import { usersConnection, usersMock } from '../../../__tests__/__mocks__/users.mocks';
import request from '../../../__tests__/__utils__/request';

describe('Users', () => {
  test('Get users without passing arguments', async () => {
    const query = gql`
      query {
        users {
          edges {
            cursor
            node {
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
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          count
          total
        }
      }
    `;
    const variables = {};
    const context = { db: { usersConnection } };

    const result = await request(query, variables, context);
    const expected = { data: { users: usersMock } };

    expect(result).toEqual(expected);
  });
});
