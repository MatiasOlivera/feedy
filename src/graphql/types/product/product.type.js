const { isEmptyReturnNull } = require('../_utils');
const { User, Organization, Issue } = require('../../../models');

async function owner(parent) {
  return (
    User.query().findById(parent.ownerId) ||
    Organization.query().findById(parent.ownerId)
  );
}

async function issues(parent) {
  const rows = await Issue.query().where('product_id', parent.id);
  return isEmptyReturnNull(rows);
}

module.exports = {
  Product: {
    owner,
    issues
  }
};
