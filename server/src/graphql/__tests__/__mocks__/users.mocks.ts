import { User } from '../../../database/prisma-client';

export const userDatabaseMock: User = {
  id: 'cjqk522np00070822z73setzt',
  firstName: 'Matías',
  lastName: 'Olivera',
  gender: 'Male',
  username: 'MatiasOlivera',
  password: 'graphql-is-awesome',
  email: 'MatiasOlivera@mail.com',
  bio: null,
  createdAt: '2019-01-06T00:07:56.752Z',
  updatedAt: '2019-01-06T00:12:14.303Z',
  deletedAt: null
};

const { password, ...userWithoutPassword } = userDatabaseMock;

export const userMock = {
  ...userWithoutPassword,
  fullName: 'Matías Olivera'
};

const usersDatabaseMock: any = {
  edges: [
    {
      cursor: 'cjqk522np00070822z73setzt',
      node: {
        id: 'cjqk522np00070822z73setzt',
        firstName: 'Matías',
        lastName: 'Olivera',
        gender: 'Male',
        username: 'MatiasOlivera',
        email: 'MatiasOlivera@mail.com',
        bio: null,
        createdAt: '2019-01-06T00:07:56.752Z',
        updatedAt: '2019-01-06T00:12:14.303Z',
        deletedAt: null
      }
    },
    {
      cursor: 'cjqefw0qe001w0822jhyejl39',
      node: {
        id: 'cjqefw0qe001w0822jhyejl39',
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        username: 'JohnDoe',
        email: 'JohnDoe@mail.com',
        bio: null,
        createdAt: '2019-01-02T00:24:33.094Z',
        updatedAt: '2019-01-02T00:24:33.094Z',
        deletedAt: null
      }
    },
    {
      cursor: 'cjqefx4tm002a0822l78lvtkv',
      node: {
        id: 'cjqefx4tm002a0822l78lvtkv',
        firstName: 'Foo',
        lastName: 'Bar',
        gender: 'Male',
        username: 'FooBar',
        email: 'FooBar@mail.com',
        bio: null,
        createdAt: '2019-01-02T00:25:25.161Z',
        updatedAt: '2019-01-02T00:25:25.161Z',
        deletedAt: null
      }
    }
  ],
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: 'cjqk522np00070822z73setzt',
    endCursor: 'cjqefx4tm002a0822l78lvtkv'
  },
  count: 3,
  total: 3
};

export const usersMock = {
  ...usersDatabaseMock,
  edges: usersDatabaseMock.edges.map((user: any) => ({
    cursor: user.cursor,
    node: {
      ...user.node,
      fullName: `${user.node.firstName} ${user.node.lastName}`
    }
  }))
};

export const usersConnection = jest.fn(() => {
  return {
    edges: usersDatabaseMock.edges,
    pageInfo: usersDatabaseMock.pageInfo,
    aggregate: jest.fn(() => ({ count: () => usersDatabaseMock.count }))
  };
});
