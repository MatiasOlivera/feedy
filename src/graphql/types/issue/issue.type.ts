import { isEmptyReturnNull } from '../_utils';
import { User, Product, Comment } from '../../../models';
import { IIssue } from 'graphql-schema';

async function author(issue: IIssue) {
  return User.query().findById(issue.userId);
}

async function product(issue: IIssue) {
  return Product.query().findById(issue.productId);
}

async function comments(issue: IIssue) {
  const rows = await Comment.query()
    .joinRelation('issue')
    .where('issue_id', issue.id);

  return isEmptyReturnNull(rows);
}

export default {
  Issue: {
    author,
    product,
    comments
  }
};
