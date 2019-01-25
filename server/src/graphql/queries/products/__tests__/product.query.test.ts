import gql from 'gql-tag';

import { productMock } from '../../../__tests__/__mocks__/products.mocks';
import request from '../../../__tests__/__utils__/request';
import { QueryResolvers } from '../../../resolvers.types';

test('Get product by ID', async () => {
  const query = gql`
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        name
        description
        createdAt
        updatedAt
        deletedAt
      }
    }
  `;
  const variables: QueryResolvers.ArgsProduct = { id: productMock.id };
  const context = { db: { product: jest.fn(() => productMock) } };

  const result = await request(query, variables, context);
  const expected = { data: { product: productMock } };

  expect(result).toEqual(expected);
});
