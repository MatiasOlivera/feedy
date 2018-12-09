const { Organization } = require('../../../../models');
const {
  validatePaginationArgs,
  getPage,
  getColumn
} = require('../../../../services/db.service');

const organizationsQuery = async (root, args) => {
  try {
    const { page, limit, orderBy, direction, deleted } = args;

    const { columns } = await Organization.fetchTableMetadata();
    const column = getColumn(orderBy);
    validatePaginationArgs(page, limit, { column, columns });

    const pageNumber = getPage(page);

    let query = Organization.query();
    query = deleted ? query.whereDeleted() : query.whereNotDeleted();
    query.orderBy(column, direction).page(pageNumber, limit);

    const organizations = await query;

    return organizations.results;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Query: {
    organizations: organizationsQuery
  }
};
