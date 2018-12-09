const { Product } = require('../../../../../models');
const {
  validatePaginationArgs,
  getPage,
  getColumn
} = require('../../../../../services/db.service');

const productsQuery = async (root, args) => {
  try {
    const { page, limit, orderBy, direction, deleted } = args;

    const { columns } = await Product.fetchTableMetadata();
    const column = getColumn(orderBy);
    validatePaginationArgs(page, limit, { column, columns });

    const pageNumber = getPage(page);

    let query = Product.query();
    query = deleted ? query.whereDeleted() : query.whereNotDeleted();
    query.orderBy(column, direction).page(pageNumber, limit);

    const products = await query;

    return products.results;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Query: {
    products: productsQuery
  }
};
