import { CreateIssueValidator } from '../../../../app/validators';
import { Issue } from '../../../../models';

const createIssue = async (root: any, args: any): Promise<any> => {
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
