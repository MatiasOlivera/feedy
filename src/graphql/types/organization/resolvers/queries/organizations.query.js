const { Organization } = require('../../../../../models');
const {
  validatePaginationArgs,
  getPage,
  getColumn
} = require('../../../../../services/db.service');

const organizationsQuery = async (root, args) => {
  try {
    const { page, limit, orderBy, direction } = args;

    const { columns } = await Organization.fetchTableMetadata();
    const column = getColumn(orderBy);
    validatePaginationArgs(page, limit, { column, columns });

    const pageNumber = getPage(page);

    const organizations = await Organization.query()
      .orderBy(column, direction)
      .page(pageNumber, limit);

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