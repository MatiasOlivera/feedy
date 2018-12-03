const ProductValidator = require('./product.validator');

class CreateProductValidator extends ProductValidator {
  rules() {
    const rules = super.rules();
    rules.name = ['required', ...rules.name];
    rules.ownerId = ['required', ...rules.ownerId];
    return rules;
  }
}

module.exports = CreateProductValidator;
