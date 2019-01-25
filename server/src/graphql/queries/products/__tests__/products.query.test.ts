import gql from 'gql-tag';

import { productsConnection, productsMock } from '../../../__tests__/__mocks__/products.mocks';
import request from '../../../__tests__/__utils__/request';

describe('Products', () => {
  test('Get products without passing arguments', async () => {
    const query = gql`
      query {
        products {
          edges {
            cursor
            node {
              id
              name
              description
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
    const context = { db: { productsConnection } };

    const result = await request(query, variables, context);
    const expected = { data: { products: productsMock } };

    expect(result).toEqual(expected);
  });
});
