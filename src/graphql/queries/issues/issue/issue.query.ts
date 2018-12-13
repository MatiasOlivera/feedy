import { Issue } from '../../../../models';

const issueQuery = async (root: any, args: any): Promise<any> => {
  try {
    const { id } = args;
    return await Issue.query().findById(id);
  } catch (err) {
    throw err;
  }
};

export default { Query: { issue: issueQuery } };
