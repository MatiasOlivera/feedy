// eslint-disable-next-line no-underscore-dangle
import { Organization, User } from '../../../database/prisma-client';

function __resolveType(parent: User | Organization): 'User' | 'Organization' {
  return parent.hasOwnProperty('username') ? 'User' : 'Organization';
}

export default { ProductOwner: { __resolveType } };
