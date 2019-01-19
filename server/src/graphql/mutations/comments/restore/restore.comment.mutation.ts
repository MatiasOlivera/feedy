import { MutationResolvers } from '../../../resolvers.types';

const restoreComment: MutationResolvers.RestoreCommentResolver = async (
  parent,
  args,
  ctx
) => {
  try {
    const commentExists = await ctx.db.$exists.comment({ id: args.id });

    if (!commentExists)
      return {
        operation: { status: false, message: 'The comment does not exists' },
        comment: null
      };
  } catch (err) {
    throw err;
  }

  try {
    const comment = await ctx.db.updateComment({
      data: { deletedAt: null },
      where: { id: args.id }
    });

    return {
      operation: {
        status: true,
        message: 'The comment was restored succesfully'
      },
      comment
    };
  } catch (err) {
    throw err;
  }
};

export default { Mutation: { restoreComment } };
