import { Organization } from '../../../../models';
import paginate from '../../_utils/pagination';

const organizationsQuery = async (root: any, args: any): Promise<any> => {
  try {
    return await paginate(Organization, args);
  } catch (err) {
    throw err;
  }
};

export default { Query: { organizations: organizationsQuery } };
