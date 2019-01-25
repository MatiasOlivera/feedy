import gql from 'gql-tag';

import { organizationMock } from '../../../__tests__/__mocks__/organizations.mocks';
import request from '../../../__tests__/__utils__/request';
import { QueryResolvers } from '../../../resolvers.types';

test('Get organization by ID', async () => {
  const query = gql`
    query getOrganization($id: ID!) {
      organization(id: $id) {
        id
        name
        bio
        createdAt
        updatedAt
        deletedAt
      }
    }
  `;
  const variables: QueryResolvers.ArgsOrganization = {
    id: organizationMock.id
  };
  const context = { db: { organization: jest.fn(() => organizationMock) } };

  const result = await request(query, variables, context);
  const expected = { data: { organization: organizationMock } };

  expect(result).toEqual(expected);
});
