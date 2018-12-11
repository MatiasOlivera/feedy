const { isEmptyReturnNull } = require('../_utils');
const { User, Issue, Comment } = require('../../../models');

async function author(_parent) {
  return User.query().findById(_parent.userId);
}

async function issue(_parent) {
  return Issue.query()
    .joinRelation('comments')
    .where('comment_id', _parent.id)
    .first();
}

async function parent(_parent) {
  return _parent.parentId ? Comment.query().findById(_parent.parentId) : null;
}

async function children(_parent) {
  const rows = Comment.query()
    .joinRelation('children')
    .where('children.parent_id', _parent.id);

  return isEmptyReturnNull(rows);
}

module.exports = {
  Comment: {
    author,
    issue,
    parent,
    children
  }
};
