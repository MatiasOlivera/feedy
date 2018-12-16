import { Organization } from '../../../../models';
import paginate from '../../_utils/pagination';
import { IPagination, IOrganization } from 'graphql-schema';

const organizationsQuery = async (
  root: undefined,
  args: IPagination
): Promise<IOrganization> => {
  try {
    return await paginate(Organization, args);
  } catch (err) {
    throw err;
  }
};

export default { Query: { organizations: organizationsQuery } };
