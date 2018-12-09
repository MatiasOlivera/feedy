const { User } = require('../../../../models');
const {
  validatePaginationArgs,
  getPage,
  getColumn
} = require('../../../../services/db.service');

const usersQuery = async (root, args) => {
  try {
    const { page, limit, orderBy, direction, deleted } = args;

    const { columns } = await User.fetchTableMetadata();
    const column = getColumn(orderBy);
    validatePaginationArgs(page, limit, { column, columns });

    const pageNumber = getPage(page);

    let query = User.query();
    query = deleted ? query.whereDeleted() : query.whereNotDeleted();
    query.orderBy(column, direction).page(pageNumber, limit);

    const users = await query;

    return users.results;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Query: {
    users: usersQuery
  }
};
