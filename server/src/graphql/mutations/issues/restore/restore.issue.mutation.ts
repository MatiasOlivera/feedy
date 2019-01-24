import { MutationResolvers } from '../../../resolvers.types';

const restoreIssue: MutationResolvers.RestoreIssueResolver = async (
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
      data: { deletedAt: null },
      where: { id: args.id }
    });

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

export default restoreIssue;
