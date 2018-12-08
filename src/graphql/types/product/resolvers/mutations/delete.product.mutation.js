const { Product } = require('../../../../../models');

const deleteProduct = async (root, args) => {
  let product;
  try {
    product = await Product.query().findById(args.id);

    if (!product)
      return {
        operation: {
          status: false,
          message: 'The product does not exists'
        },
        product: null
      };
  } catch (err) {
    throw err;
  }

  try {
    await Product.query().deleteById(args.id);
    product = await Product.query().findById(args.id);

    return {
      operation: {
        status: true,
        message: 'The product was deleted succesfully'
      },
      product
    };
  } catch (err) {
    throw err;
  }
};

module.exports = { Mutation: { deleteProduct } };
