const { UpdateProductValidator } = require('../../../../../app/validators');
const { Product } = require('../../../../../models');

const updateProduct = async (root, args) => {
  let product;
  try {
    product = await Product.query().findById(args.id);

    if (!product)
      return {
        operation: {
          status: false,
          message: 'The product does not exists'
        },
        product: null,
        errors: null
      };
  } catch (err) {
    throw err;
  }

  try {
    const inputProduct = { id: args.id, ...args.product };
    const validator = new UpdateProductValidator(inputProduct);
    await validator.validate();
  } catch (err) {
    return {
      operation: { status: false, message: 'There are validation errors' },
      product: null,
      errors: err
    };
  }

  try {
    const updatedProduct = await product.$query().patchAndFetch(args.product);

    return {
      operation: {
        status: true,
        message: 'The product was updated succesfully'
      },
      product: updatedProduct,
      errors: null
    };
  } catch (err) {
    throw err;
  }
};

module.exports = { Mutation: { updateProduct } };
