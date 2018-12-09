const { Comment } = require('../../../../models');

const commentQuery = async (root, args) => {
  try {
    const { id } = args;
    return await Comment.query().findById(id);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Query: {
    comment: commentQuery
  }
};
