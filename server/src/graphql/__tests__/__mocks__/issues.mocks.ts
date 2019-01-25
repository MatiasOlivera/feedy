import { Issue, IssueConnection } from '../../../database/prisma-client';

export const issueMock: Issue = {
  id: 'cjqim1djl001l0722r90sgcy6',
  title: 'The app crashes on Android',
  body: 'Explanation...',
  createdAt: '2019-01-04T22:27:45.489Z',
  updatedAt: '2019-01-04T22:30:13.925Z',
  deletedAt: null
};

export const issuesMock: Issues = {
  edges: [
    {
      cursor: 'cjqim1djl001l0722r90sgcy6',
      node: {
        id: 'cjqim1djl001l0722r90sgcy6',
        title: 'The app crashes on Android',
        body: 'Explanation...',
        createdAt: '2019-01-04T22:27:45.489Z',
        updatedAt: '2019-01-04T22:30:13.925Z',
        deletedAt: null
      }
    },
    {
      cursor: 'cjqk522np00070822z73setzt',
      node: {
        id: 'cjqk522np00070822z73setzt',
        title: 'Problems when trying to login on iOS',
        body: 'Explanation...',
        createdAt: '2019-01-04T22:27:45.489Z',
        updatedAt: '2019-01-04T22:30:13.925Z',
        deletedAt: null
      }
    },
    {
      cursor: 'cjqefw0qe001w0822jhyejl39',
      node: {
        id: 'cjqefw0qe001w0822jhyejl39',
        title: 'The best idea ever!!',
        body: 'Explanation...',
        createdAt: '2019-01-04T22:27:45.489Z',
        updatedAt: '2019-01-04T22:30:13.925Z',
        deletedAt: null
      }
    }
  ],
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: 'cjqim1djl001l0722r90sgcy6',
    endCursor: 'cjqefw0qe001w0822jhyejl39'
  },
  count: 3,
  total: 3
};

export const issuesConnection = jest.fn(() => {
  return {
    edges: issuesMock.edges,
    pageInfo: issuesMock.pageInfo,
    aggregate: jest.fn(() => ({ count: () => issuesMock.count }))
  };
});

type Issues = IssueConnection & { count: number; total: number };
