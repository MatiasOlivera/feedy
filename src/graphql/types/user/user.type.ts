import { isEmptyReturnNull } from '../_utils';
import { Product, Organization, Issue, Comment } from '../../../models';

async function products(parent: any) {
  const rows = await Product.query().where('owner_id', parent.id);
  return isEmptyReturnNull(rows);
}

async function organizations(parent: any) {
  const rows = await Organization.query()
    .joinRelation('members')
    .where('user_id', parent.id);

  return isEmptyReturnNull(rows);
}

async function issues(parent: any) {
  const rows = await Issue.query().where('user_id', parent.id);
  return isEmptyReturnNull(rows);
}

async function comments(parent: any) {
  const rows = await Comment.query().where('user_id', parent.id);
  return isEmptyReturnNull(rows);
}

export default {
  User: {
    products,
    organizations,
    issues,
    comments
  }
};
