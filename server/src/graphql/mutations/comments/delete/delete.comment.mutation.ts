import { MutationResolvers } from '../../../resolvers.types';

const deleteComment: MutationResolvers.DeleteCommentResolver = async (
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
      data: { deletedAt: new Date() },
      where: { id: args.id }
    });

    return {
      operation: {
        status: true,
        message: 'The comment was deleted succesfully'
      },
      comment
    };
  } catch (err) {
    throw err;
  }
};

export default { Mutation: { deleteComment } };
