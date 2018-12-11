const { isEmptyReturnNull } = require('../_utils');
const { User, Product, Comment } = require('../../../models');

async function author(parent) {
  return User.query().findById(parent.userId);
}

async function product(parent) {
  return Product.query().findById(parent.productId);
}

async function comments(parent) {
  const rows = await Comment.query()
    .joinRelation('issue')
    .where('issue_id', parent.id);

  return isEmptyReturnNull(rows);
}

module.exports = {
  Issue: {
    author,
    product,
    comments
  }
};
