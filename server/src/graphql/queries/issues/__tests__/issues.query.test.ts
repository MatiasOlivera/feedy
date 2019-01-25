import gql from 'gql-tag';

import { issuesConnection, issuesMock } from '../../../__tests__/__mocks__/issues.mocks';
import request from '../../../__tests__/__utils__/request';

describe('Issues', () => {
  test('Get issues without passing arguments', async () => {
    const query = gql`
      query {
        issues {
          edges {
            cursor
            node {
              id
              title
              body
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
    const context = { db: { issuesConnection } };

    const result = await request(query, variables, context);
    const expected = { data: { issues: issuesMock } };

    expect(result).toEqual(expected);
  });
});
