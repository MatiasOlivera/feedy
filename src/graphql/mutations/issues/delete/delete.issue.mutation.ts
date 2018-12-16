import { Issue } from '../../../../models';
import { IIssueSimplePayload } from 'graphql-schema';

const deleteIssue = async (
  root: undefined,
  args: { id: string }
): Promise<IIssueSimplePayload> => {
  let issue;
  try {
    issue = await Issue.query().findById(args.id);

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
    await Issue.query().deleteById(args.id);
    issue = await Issue.query().findById(args.id);

    return {
      operation: {
        status: true,
        message: 'The issue was deleted succesfully'
      },
      issue
    };
  } catch (err) {
    throw err;
  }
};

export default { Mutation: { deleteIssue } };
