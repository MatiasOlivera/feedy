const { UpdateCommentValidator } = require('../../../../app/validators');
const { Comment } = require('../../../../models');

const updateComment = async (root, args) => {
  let comment;
  try {
    comment = await Comment.query().findById(args.id);

    if (!comment)
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
    const validator = new UpdateCommentValidator(inputComment);
    await validator.validate();
  } catch (err) {
    return {
      operation: { status: false, message: 'There are validation errors' },
      comment: null,
      errors: err
    };
  }

  try {
    const updatedComment = await comment.$query().patchAndFetch(args.comment);

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

module.exports = { Mutation: { updateComment } };
