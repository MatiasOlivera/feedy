const { Product } = require('../../../../../models');

const productQuery = async (root, args) => {
  try {
    const { id } = args;
    return await Product.query().findById(id);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Query: {
    product: productQuery
  }
};
