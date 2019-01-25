import { Organization, OrganizationConnection } from '../../../database/prisma-client';

export const organizationMock: Organization = {
  id: 'cjqimzagw00330722x86kjvcb',
  name: 'Google',
  bio: null,
  createdAt: '2019-01-04T22:54:07.808Z',
  updatedAt: '2019-01-04T22:54:07.808Z',
  deletedAt: null
};

export const organizationsMock: Organizations = {
  edges: [
    {
      cursor: 'cjqimzagw00330722x86kjvcb',
      node: {
        id: 'cjqimzagw00330722x86kjvcb',
        name: 'Google',
        bio: null,
        createdAt: '2019-01-04T22:54:07.808Z',
        updatedAt: '2019-01-04T22:54:07.808Z',
        deletedAt: null
      }
    },
    {
      cursor: 'cjqimz42r002y0722pkjxed63',
      node: {
        id: 'cjqimz42r002y0722pkjxed63',
        name: 'Microsoft',
        bio: null,
        createdAt: '2019-01-04T22:54:07.808Z',
        updatedAt: '2019-01-04T22:54:07.808Z',
        deletedAt: null
      }
    },
    {
      cursor: 'cjqimzc2j00380722zpx9ikph',
      node: {
        id: 'cjqimzc2j00380722zpx9ikph',
        name: 'Apple',
        bio: null,
        createdAt: '2019-01-04T22:54:07.808Z',
        updatedAt: '2019-01-04T22:54:07.808Z',
        deletedAt: null
      }
    }
  ],
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: 'cjqimzagw00330722x86kjvcb',
    endCursor: 'cjqimzc2j00380722zpx9ikph'
  },
  count: 3,
  total: 3
};

export const organizationsConnection = jest.fn(() => {
  return {
    edges: organizationsMock.edges,
    pageInfo: organizationsMock.pageInfo,
    aggregate: jest.fn(() => ({ count: () => organizationsMock.count }))
  };
});

type Organizations = OrganizationConnection & { count: number; total: number };
