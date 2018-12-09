const { Comment } = require('../../../../models');

const deleteComment = async (root, args) => {
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

module.exports = { Mutation: { deleteComment } };
