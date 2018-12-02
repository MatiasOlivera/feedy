const { User } = require('../../../../../models');
const {
  validatePaginationArgs,
  getPage,
  getColumn
} = require('../../../../../services/db.service');

const usersQuery = async (root, args) => {
  try {
    const { page, limit, orderBy, direction } = args;

    const { columns } = await User.fetchTableMetadata();
    const column = getColumn(orderBy);
    validatePaginationArgs(page, limit, { column, columns });

    const pageNumber = getPage(page);

    const users = await User.query()
      .orderBy(column, direction)
      .page(pageNumber, limit);

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
