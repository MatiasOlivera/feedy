import { CreateCommentValidator } from '../../../../app/validators';
import { MutationResolvers } from '../../../resolvers.types';

const createComment: MutationResolvers.CreateCommentResolver = async (
  parent,
  args,
  ctx
) => {
  const { comment } = args;

  try {
    const validator = new CreateCommentValidator(comment);
    await validator.validate();
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

export default { Mutation: { createComment } };
