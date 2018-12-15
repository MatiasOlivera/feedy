import { isEmptyReturnNull } from '../_utils';
import { User, Organization, Issue } from '../../../models';
import { IProduct } from 'graphql-schema';

async function owner(product: IProduct) {
  return (
    User.query().findById(product.ownerId) ||
    Organization.query().findById(product.ownerId)
  );
}

async function issues(product: IProduct) {
  const rows = await Issue.query().where('product_id', product.id);
  return isEmptyReturnNull(rows);
}

export default {
  Product: {
    owner,
    issues
  }
};
