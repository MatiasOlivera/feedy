const { isEmptyReturnNull } = require('../_utils');
const { Product, Organization, Issue, Comment } = require('../../../models');

async function products(parent) {
  const rows = await Product.query().where('owner_id', parent.id);
  return isEmptyReturnNull(rows);
}

async function organizations(parent) {
  const rows = await Organization.query()
    .joinRelation('members')
    .where('user_id', parent.id);

  return isEmptyReturnNull(rows);
}

async function issues(parent) {
  const rows = await Issue.query().where('user_id', parent.id);
  return isEmptyReturnNull(rows);
}

async function comments(parent) {
  const rows = await Comment.query().where('user_id', parent.id);
  return isEmptyReturnNull(rows);
}

module.exports = {
  User: {
    products,
    organizations,
    issues,
    comments
  }
};
