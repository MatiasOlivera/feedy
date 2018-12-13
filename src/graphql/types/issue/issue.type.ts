import { isEmptyReturnNull } from '../_utils';
import { User, Product, Comment } from '../../../models';

async function author(parent: any) {
  return User.query().findById(parent.userId);
}

async function product(parent: any) {
  return Product.query().findById(parent.productId);
}

async function comments(parent: any) {
  const rows = await Comment.query()
    .joinRelation('issue')
    .where('issue_id', parent.id);

  return isEmptyReturnNull(rows);
}

export default {
  Issue: {
    author,
    product,
    comments
  }
};
