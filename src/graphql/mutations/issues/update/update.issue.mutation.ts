import { UpdateIssueValidator } from '../../../../app/validators';
import { Issue } from '../../../../models';
import { IIssuePayload } from 'graphql-schema';

const updateIssue = async (
  root: undefined,
  args: any
): Promise<IIssuePayload> => {
  let issue;
  try {
    issue = await Issue.query().findById(args.id);

    if (!issue)
      return {
        operation: {
          status: false,
          message: 'The issue does not exists'
        },
        issue: null,
        errors: null
      };
  } catch (err) {
    throw err;
  }

  try {
    const inputIssue = { id: args.id, ...args.issue };
    const validator = new UpdateIssueValidator(inputIssue);
    await validator.validate();
  } catch (err) {
    return {
      operation: { status: false, message: 'There are validation errors' },
      issue: null,
      errors: err
    };
  }

  try {
    const updatedIssue = await issue.$query().patchAndFetch(args.issue);

    return {
      operation: {
        status: true,
        message: 'The issue was updated succesfully'
      },
      issue: updatedIssue,
      errors: null
    };
  } catch (err) {
    throw err;
  }
};

export default { Mutation: { updateIssue } };
