const { isEmptyReturnNull } = require('../_utils');
const { Product, User } = require('../../../models');

async function products(parent) {
  const rows = await Product.query().where('owner_id', parent.id);
  return isEmptyReturnNull(rows);
}

async function members(parent) {
  const rows = await User.query()
    .joinRelation('organizations')
    .where('organization_id', parent.id);

  return isEmptyReturnNull(rows);
}

module.exports = {
  Organization: {
    products,
    members
  }
};
