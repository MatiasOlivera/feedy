import { Organization } from '../../../../models';
import { IOrganization } from 'graphql-schema';

const organizationQuery = async (root: undefined, args: any): Promise<IOrganization> => {
  try {
    return await Organization.query().findById(args.id);
  } catch (err) {
    throw err;
  }
};

export default { Query: { organization: organizationQuery } };
