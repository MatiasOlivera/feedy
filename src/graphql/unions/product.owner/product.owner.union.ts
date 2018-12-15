// eslint-disable-next-line no-underscore-dangle
import { IUser, IOrganization } from 'graphql-schema';

function __resolveType(parent: IUser | IOrganization): 'User' | 'Organization' {
  return parent.hasOwnProperty('username') ? 'User' : 'Organization';
}

export default { ProductOwner: { __resolveType } };
