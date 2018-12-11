const { Product } = require('../../../../models');
const paginate = require('../../_utils/pagination');

const productsQuery = async (root, args) => {
  try {
    return await paginate(Product, args);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Query: {
    products: productsQuery
  }
};
