const { Issue } = require('../../../../../models');
const {
  validatePaginationArgs,
  getPage,
  getColumn
} = require('../../../../../services/db.service');

const issuesQuery = async (root, args) => {
  try {
    const { page, limit, orderBy, direction } = args;

    const { columns } = await Issue.fetchTableMetadata();
    const column = getColumn(orderBy);
    validatePaginationArgs(page, limit, { column, columns });

    const pageNumber = getPage(page);

    const issues = await Issue.query()
      .orderBy(column, direction)
      .page(pageNumber, limit);

    return issues.results;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Query: {
    issues: issuesQuery
  }
};