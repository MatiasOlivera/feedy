import { isEmptyReturnNull } from '../_utils';
import { User, Organization, Issue } from '../../../models';

async function owner(parent: any) {
  return (
    User.query().findById(parent.ownerId) ||
    Organization.query().findById(parent.ownerId)
  );
}

async function issues(parent: any) {
  const rows = await Issue.query().where('product_id', parent.id);
  return isEmptyReturnNull(rows);
}

export default {
  Product: {
    owner,
    issues
  }
};
