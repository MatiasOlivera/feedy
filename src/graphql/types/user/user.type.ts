import { isEmptyReturnNull } from '../_utils';
import { Product, Organization, Issue, Comment } from '../../../models';
import { User as IUser } from 'graphql-schema';

async function products(user: IUser) {
  const rows = await Product.query().where('owner_id', user.id);
  return isEmptyReturnNull(rows);
}

async function organizations(user: IUser) {
  const rows = await Organization.query()
    .joinRelation('members')
    .where('user_id', user.id);

  return isEmptyReturnNull(rows);
}

async function issues(user: IUser) {
  const rows = await Issue.query().where('user_id', user.id);
  return isEmptyReturnNull(rows);
}

async function comments(user: IUser) {
  const rows = await Comment.query().where('user_id', user.id);
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
