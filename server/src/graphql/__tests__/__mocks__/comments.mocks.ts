import { Comment, CommentConnection } from '../../../database/prisma-client';

export const commentMock: Comment = {
  id: 'cjqegxkph004508222ilxtdpw',
  body: 'The best product ever!',
  createdAt: '2019-01-02T00:53:45.364Z',
  updatedAt: '2019-01-02T00:53:45.364Z',
  deletedAt: null
};

export const commentsMock: Comments = {
  edges: [
    {
      cursor: 'cjqegxkph004508222ilxtdpw',
      node: {
        id: 'cjqegxkph004508222ilxtdpw',
        body: 'The best product ever!',
        createdAt: '2019-01-02T00:53:45.364Z',
        updatedAt: '2019-01-02T00:53:45.364Z',
        deletedAt: null
      }
    },
    {
      cursor: 'cjqegwtjw003x0822kiaydshn',
      node: {
        id: 'cjqegwtjw003x0822kiaydshn',
        body: 'It is awesome!',
        createdAt: '2019-01-02T00:53:10.171Z',
        updatedAt: '2019-01-02T00:53:10.171Z',
        deletedAt: null
      }
    }
  ],
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: 'cjqegxkph004508222ilxtdpw',
    endCursor: 'cjqegwtjw003x0822kiaydshn'
  },
  count: 2,
  total: 2
};

export const commentsConnection = jest.fn(() => {
  return {
    edges: commentsMock.edges,
    pageInfo: commentsMock.pageInfo,
    aggregate: jest.fn(() => ({ count: () => commentsMock.count }))
  };
});

type Comments = CommentConnection & { count: number; total: number };
