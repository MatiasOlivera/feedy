const { CreateProductValidator } = require('../../../../app/validators');
const { Product } = require('../../../../models');

const createProduct = async (root, args) => {
  const { product } = args;

  try {
    const validator = new CreateProductValidator(product);
    await validator.validate();
  } catch (err) {
    return {
      operation: { status: false, message: 'There are validation errors' },
      product: null,
      errors: err
    };
  }

  try {
    const newProduct = await Product.query().insertAndFetch(product);

    return {
      operation: {
        status: true,
        message: 'The product was created succesfully'
      },
      product: newProduct,
      errors: null
    };
  } catch (err) {
    throw err;
  }
};

module.exports = { Mutation: { createProduct } };
