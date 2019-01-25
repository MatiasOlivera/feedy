import gql from 'gql-tag';

import { organizationsConnection, organizationsMock } from '../../../__tests__/__mocks__/organizations.mocks';
import request from '../../../__tests__/__utils__/request';

describe('Organizations', () => {
  test('Get organizations without passing arguments', async () => {
    const query = gql`
      query {
        organizations {
          edges {
            cursor
            node {
              id
              name
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
    const context = { db: { organizationsConnection } };

    const result = await request(query, variables, context);
    const expected = { data: { organizations: organizationsMock } };

    expect(result).toEqual(expected);
  });
});
