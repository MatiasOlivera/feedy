const { Product } = require('../../models');
const {
  validatePaginationArgs,
  getPage,
  getColumn
} = require('../../services/db.service');

const productQuery = async (root, args) => {
  try {
    const { id } = args;
    return await Product.query().findById(id);
  } catch (err) {
    throw err;
  }
};

const productsQuery = async (root, args) => {
  try {
    const { page, limit, orderBy, direction } = args;

    const { columns } = await Product.fetchTableMetadata();
    const column = getColumn(orderBy);
    validatePaginationArgs(page, limit, { column, columns });

    const pageNumber = getPage(page);

    const products = await Product.query()
      .orderBy(column, direction)
      .page(pageNumber, limit);

    return products.results;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Query: {
    product: productQuery,
    products: productsQuery
  }
};
