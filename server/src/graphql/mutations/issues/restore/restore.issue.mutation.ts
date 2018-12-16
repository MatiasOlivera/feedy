import { Issue } from '../../../../models';
import { IIssueSimplePayload } from 'graphql-schema';

const restoreIssue = async (
  root: undefined,
  args: { id: string }
): Promise<IIssueSimplePayload> => {
  try {
    const issue = await Issue.query().findById(args.id);

    if (!issue)
      return {
        operation: {
          status: false,
          message: 'The issue does not exists'
        },
        issue: null
      };
  } catch (err) {
    throw err;
  }

  try {
    await Issue.query()
      .where('id', args.id)
      .restore();

    const issue = await Issue.query().findById(args.id);

    return {
      operation: {
        status: true,
        message: 'The issue was restored succesfully'
      },
      issue
    };
  } catch (err) {
    throw err;
  }
};

export default { Mutation: { restoreIssue } };
