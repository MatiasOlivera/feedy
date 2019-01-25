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
