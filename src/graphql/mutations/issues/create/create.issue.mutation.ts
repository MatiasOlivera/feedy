import { CreateIssueValidator } from '../../../../app/validators';
import { Issue } from '../../../../models';
import { IIssuePayload } from 'graphql-schema';

const createIssue = async (
  root: undefined,
  args: any
): Promise<IIssuePayload> => {
  const { issue } = args;

  try {
    const validator = new CreateIssueValidator(issue);
    await validator.validate();
  } catch (err) {
    return {
      operation: { status: false, message: 'There are validation errors' },
      issue: null,
      errors: err
    };
  }

  try {
    const newIssue = await Issue.query().insertAndFetch(issue);

    return {
      operation: {
        status: true,
        message: 'The issue was created succesfully'
      },
      issue: newIssue,
      errors: null
    };
  } catch (err) {
    throw err;
  }
};

export default { Mutation: { createIssue } };
