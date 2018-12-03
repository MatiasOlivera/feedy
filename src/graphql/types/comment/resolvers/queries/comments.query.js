const { Comment } = require('../../../../../models');
const {
  validatePaginationArgs,
  getPage,
  getColumn
} = require('../../../../../services/db.service');

const commentsQuery = async (root, args) => {
  try {
    const { page, limit, orderBy, direction } = args;

    const { columns } = await Comment.fetchTableMetadata();
    const column = getColumn(orderBy);
    validatePaginationArgs(page, limit, { column, columns });

    const pageNumber = getPage(page);

    const comments = await Comment.query()
      .orderBy(column, direction)
      .page(pageNumber, limit);

    return comments.results;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Query: {
    comments: commentsQuery
  }
};