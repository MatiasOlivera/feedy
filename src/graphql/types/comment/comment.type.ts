import { isEmptyReturnNull } from '../_utils';
import { User, Issue, Comment } from '../../../models';
import { IComment } from 'graphql-schema';

async function author(comment: IComment) {
  return User.query().findById(comment.userId);
}

async function issue(comment: IComment) {
  return Issue.query()
    .joinRelation('comments')
    .where('comment_id', comment.id)
    .first();
}

async function parent(comment: IComment) {
  return comment.parentId ? Comment.query().findById(comment.parentId) : null;
}

async function children(comment: IComment) {
  const rows = Comment.query()
    .joinRelation('children')
    .where('children.parent_id', comment.id);

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
