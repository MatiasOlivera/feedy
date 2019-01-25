import { Product, ProductConnection } from '../../../database/prisma-client';

export const productMock: Product = {
  id: 'cjqegncjw003e0822ggtv5m3e',
  name: 'Feedly',
  description: ' A collaborative feedback app',
  createdAt: '2019-01-02T00:45:48.235Z',
  updatedAt: '2019-01-02T00:45:48.235Z',
  deletedAt: null
};

export const productsMock: Products = {
  edges: [
    {
      cursor: 'cjqegncjw003e0822ggtv5m3e',
      node: {
        id: 'cjqegncjw003e0822ggtv5m3e',
        name: 'Feedly',
        description: 'A collaborative feedback app',
        createdAt: '2019-01-02T00:45:48.235Z',
        updatedAt: '2019-01-02T00:45:48.235Z',
        deletedAt: null
      }
    },
    {
      cursor: 'cjqegnghp003l0822pn1mpymu',
      node: {
        id: 'cjqegnghp003l0822pn1mpymu',
        name: 'GraphQL',
        description: 'A query language for APIs',
        createdAt: '2019-01-02T00:45:53.341Z',
        updatedAt: '2019-01-02T00:45:53.341Z',
        deletedAt: null
      }
    },
    {
      cursor: 'cjqegn5lj00370822ah96sq92',
      node: {
        id: 'cjqegn5lj00370822ah96sq92',
        name: 'Typescript',
        description: 'A typed superset of Javascript',
        createdAt: '2019-01-02T00:45:39.220Z',
        updatedAt: '2019-01-02T00:45:39.220Z',
        deletedAt: null
      }
    }
  ],
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: 'cjqegncjw003e0822ggtv5m3e',
    endCursor: 'cjqegn5lj00370822ah96sq92'
  },
  count: 3,
  total: 3
};

export const productsConnection = jest.fn(() => {
  return {
    edges: productsMock.edges,
    pageInfo: productsMock.pageInfo,
    aggregate: jest.fn(() => ({ count: () => productsMock.count }))
  };
});

type Products = ProductConnection & { count: number; total: number };
