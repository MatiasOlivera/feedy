const ProductValidator = require('./product.validator');

class UpdateProductValidator extends ProductValidator {
  rules() {
    return super.rules();
  }
}

module.exports = UpdateProductValidator;
