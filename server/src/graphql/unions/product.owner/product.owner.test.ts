/* eslint-disable no-underscore-dangle */
import { organizationMock } from '../../__tests__/__mocks__/organizations.mocks';
import { userDatabaseMock } from '../../__tests__/__mocks__/users.mocks';
import ProductOwner from './product.owner.union';

describe('ProductOwner', () => {
  test('should return "User" when has property "username"', () => {
    const actual = ProductOwner.__resolveType(userDatabaseMock);
    expect(actual).toBe('User');
  });

  test('should return "Organization" when has not property "username"', () => {
    const actual = ProductOwner.__resolveType(organizationMock);
    expect(actual).toBe('Organization');
  });
});
