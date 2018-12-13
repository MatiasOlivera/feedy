import { isEmptyReturnNull } from '../_utils';
import { User, Issue, Comment } from '../../../models';

async function author(_parent: any) {
  return User.query().findById(_parent.userId);
}

async function issue(_parent: any) {
  return Issue.query()
    .joinRelation('comments')
    .where('comment_id', _parent.id)
    .first();
}

async function parent(_parent: any) {
  return _parent.parentId ? Comment.query().findById(_parent.parentId) : null;
}

async function children(_parent: any) {
  const rows = Comment.query()
    .joinRelation('children')
    .where('children.parent_id', _parent.id);

  return isEmptyReturnNull(rows);
}

export default {
  Comment: {
    author,
    issue,
    parent,
    children
  }
};
