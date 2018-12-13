import { isEmptyReturnNull } from '../_utils';
import { Product, User } from '../../../models';

async function products(parent: any) {
  const rows = await Product.query().where('owner_id', parent.id);
  return isEmptyReturnNull(rows);
}

async function members(parent: any) {
  const rows = await User.query()
    .joinRelation('organizations')
    .where('organization_id', parent.id);

  return isEmptyReturnNull(rows);
}

export default {
  Organization: {
    products,
    members
  }
};
