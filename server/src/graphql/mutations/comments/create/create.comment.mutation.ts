import { MutationResolvers } from '../../../resolvers.types';
import { CreateCommentValidator } from '../../../validators';

const createComment: MutationResolvers.CreateCommentResolver = async (
  parent,
  args,
  ctx
) => {
  const { comment } = args;

  try {
    const validator = new CreateCommentValidator();
    await validator.validate(comment);
  } catch (err) {
    return {
      operation: { status: false, message: 'There are validation errors' },
      comment: null,
      errors: err
    };
  }

  try {
    const newComment = await ctx.db.createComment({
      body: comment.body,
      author: { connect: { id: comment.userId } },
      parent: { connect: { id: comment.parentId } },
      issue: { connect: { id: comment.issueId } }
    });

    return {
      operation: {
        status: true,
        message: 'The comment was created succesfully'
      },
      comment: newComment,
      errors: null
    };
  } catch (err) {
    throw err;
  }
};

export default createComment;
