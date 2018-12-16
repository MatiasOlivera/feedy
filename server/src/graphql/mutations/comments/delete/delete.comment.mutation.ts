import { Comment } from '../../../../models';
import { ICommentSimplePayload } from 'graphql-schema';

const deleteComment = async (
  root: undefined,
  args: { id: string }
): Promise<ICommentSimplePayload> => {
  let comment;

  try {
    comment = await Comment.query().findById(args.id);

    if (!comment)
      return {
        operation: { status: false, message: 'The comment does not exists' },
        comment: null
      };
  } catch (err) {
    throw err;
  }

  try {
    await Comment.query().deleteById(args.id);
    comment = await Comment.query().findById(args.id);

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
