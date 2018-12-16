import { Issue } from '../../../../models';
import paginate from '../../_utils/pagination';
import { IPagination, IIssue } from 'graphql-schema';

const issuesQuery = async (
  root: undefined,
  args: IPagination
): Promise<IIssue> => {
  try {
    return await paginate(Issue, args);
  } catch (err) {
    throw err;
  }
};

export default { Query: { issues: issuesQuery } };
