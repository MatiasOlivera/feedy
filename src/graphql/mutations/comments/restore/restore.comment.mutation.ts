import { Comment } from '../../../../models';
import { ICommentSimplePayload } from 'graphql-schema';

const restoreComment = async (
  root: undefined,
  args: { id: string }
): Promise<ICommentSimplePayload> => {
  try {
    const comment = await Comment.query().findById(args.id);

    if (!comment)
      return {
        operation: { status: false, message: 'The comment does not exists' },
        comment: null
      };
  } catch (err) {
    throw err;
  }

  try {
    await Comment.query()
      .where('id', args.id)
      .restore();

    const comment = await Comment.query().findById(args.id);

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
