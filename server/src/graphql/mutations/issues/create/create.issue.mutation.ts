import { CreateIssueValidator } from '../../../../app/validators';
import { MutationResolvers } from '../../../resolvers.types';

const createIssue: MutationResolvers.CreateIssueResolver = async (
  parent,
  args,
  ctx
) => {
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
    const newIssue = await ctx.db.createIssue({
      title: issue.title,
      body: issue.body,
      author: { connect: { id: issue.userId } },
      product: { connect: { id: issue.productId } }
    });

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

export default createIssue;
