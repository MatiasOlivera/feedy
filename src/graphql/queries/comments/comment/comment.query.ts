import { Comment } from '../../../../models';
import { IComment } from 'graphql-schema';

const commentQuery = async (
  root: undefined,
  args: { id: string }
): Promise<IComment> => {
  try {
    return await Comment.query().findById(args.id);
  } catch (err) {
    throw err;
  }
};

export default { Query: { comment: commentQuery } };
