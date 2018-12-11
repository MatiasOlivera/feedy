const { Comment } = require('../../../../models');
const paginate = require('../../_utils/pagination');

const commentsQuery = async (root, args) => {
  try {
    return await paginate(Comment, args);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Query: {
    comments: commentsQuery
  }
};
