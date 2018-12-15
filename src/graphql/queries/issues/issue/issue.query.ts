import { Issue } from '../../../../models';
import { IIssue } from 'graphql-schema';

const issueQuery = async (
  root: undefined,
  args: { id: string }
): Promise<IIssue> => {
  try {
    return await Issue.query().findById(args.id);
  } catch (err) {
    throw err;
  }
};

export default { Query: { issue: issueQuery } };
