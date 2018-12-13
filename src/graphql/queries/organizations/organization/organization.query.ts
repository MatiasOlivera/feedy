import { Organization } from '../../../../models';

const organizationQuery = async (root: any, args: any): Promise<any> => {
  try {
    const { id } = args;
    return await Organization.query().findById(id);
  } catch (err) {
    throw err;
  }
};

export default { Query: { organization: organizationQuery } };
