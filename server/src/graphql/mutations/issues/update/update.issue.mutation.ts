import { UpdateIssueValidator } from '../../../../app/validators';
import { MutationResolvers } from '../../../resolvers.types';

const updateIssue: MutationResolvers.UpdateIssueResolver = async (
  parent,
  args,
  ctx
) => {
  try {
    const issueExists = await ctx.db.$exists.issue({ id: args.id });

    if (!issueExists)
      return {
        operation: { status: false, message: 'The issue does not exists' },
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
    const updatedIssue = await ctx.db.updateIssue({
      data: { title: args.issue.title, body: args.issue.body },
      where: { id: args.id }
    });

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

export default updateIssue;
