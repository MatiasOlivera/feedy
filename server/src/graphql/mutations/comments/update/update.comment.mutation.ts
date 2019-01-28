import { UpdateCommentValidator } from '../../../../app/validators';
import { MutationResolvers } from '../../../resolvers.types';

const updateComment: MutationResolvers.UpdateCommentResolver = async (
  parent,
  args,
  ctx
) => {
  try {
    const commentExists = await ctx.db.$exists.comment({ id: args.id });

    if (!commentExists)
      return {
        operation: { status: false, message: 'The comment does not exists' },
        comment: null,
        errors: null
      };
  } catch (err) {
    throw err;
  }

  try {
    const inputComment = { id: args.id, ...args.comment };
    const validator = new UpdateCommentValidator();
    await validator.validate(inputComment);
  } catch (err) {
    return {
      operation: { status: false, message: 'There are validation errors' },
      comment: null,
      errors: err
    };
  }

  try {
    const updatedComment = await ctx.db.updateComment({
      data: { body: args.comment.body },
      where: { id: args.id }
    });

    return {
      operation: {
        status: true,
        message: 'The comment was updated succesfully'
      },
      comment: updatedComment,
      errors: null
    };
  } catch (err) {
    throw err;
  }
};

export default updateComment;
