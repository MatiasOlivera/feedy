import gql from 'gql-tag';

import { commentsConnection, commentsMock } from '../../../__tests__/__mocks__/comments.mocks';
import request from '../../../__tests__/__utils__/request';

describe('Comments', () => {
  test('Get comments without passing arguments', async () => {
    const query = gql`
      query {
        comments {
          edges {
            cursor
            node {
              id
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
    const context = { db: { commentsConnection } };

    const result = await request(query, variables, context);
    const expected = { data: { comments: commentsMock } };

    expect(result).toEqual(expected);
  });
});
