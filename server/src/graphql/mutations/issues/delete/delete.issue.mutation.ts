import { MutationResolvers } from '../../../resolvers.types';

const deleteIssue: MutationResolvers.DeleteIssueResolver = async (
  parent,
  args,
  ctx
) => {
  try {
    const issueExists = await ctx.db.$exists.issue({ id: args.id });

    if (!issueExists)
      return {
        operation: { status: false, message: 'The issue does not exists' },
        issue: null
      };
  } catch (err) {
    throw err;
  }

  try {
    const issue = await ctx.db.updateIssue({
      data: { deletedAt: new Date() },
      where: { id: args.id }
    });

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

export default deleteIssue;
