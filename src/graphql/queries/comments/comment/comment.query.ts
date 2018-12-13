import { Comment } from '../../../../models';

const commentQuery = async (root: any, args: any): Promise<any> => {
  try {
    const { id } = args;
    return await Comment.query().findById(id);
  } catch (err) {
    throw err;
  }
};

export default { Query: { comment: commentQuery } };
