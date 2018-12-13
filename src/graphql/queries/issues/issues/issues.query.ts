import { Issue } from '../../../../models';
import paginate from '../../_utils/pagination';

const issuesQuery = async (root: any, args: any): Promise<any> => {
  try {
    return await paginate(Issue, args);
  } catch (err) {
    throw err;
  }
};

export default { Query: { issues: issuesQuery } };
