import { isEmptyReturnNull } from '../_utils';
import { Product, User } from '../../../models';
import { IOrganization } from 'graphql-schema';

async function products(org: IOrganization) {
  const rows = await Product.query().where('owner_id', org.id);
  return isEmptyReturnNull(rows);
}

async function members(org: IOrganization) {
  const rows = await User.query()
    .joinRelation('organizations')
    .where('organization_id', org.id);

  return isEmptyReturnNull(rows);
}

export default {
  Organization: {
    products,
    members
  }
};
