const { Comment } = require('../../../../../models');
const {
  validatePaginationArgs,
  getPage,
  getColumn
} = require('../../../../../services/db.service');

const commentsQuery = async (root, args) => {
  try {
    const { page, limit, orderBy, direction, deleted } = args;

    const { columns } = await Comment.fetchTableMetadata();
    const column = getColumn(orderBy);
    validatePaginationArgs(page, limit, { column, columns });

    const pageNumber = getPage(page);

    let query = Comment.query();
    query = deleted ? query.whereDeleted() : query.whereNotDeleted();
    query.orderBy(column, direction).page(pageNumber, limit);

    const comments = await query;

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
