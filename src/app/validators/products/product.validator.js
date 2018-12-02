const BaseValidator = require('../base.validator');

class ProductValidator extends BaseValidator {
  // eslint-disable-next-line class-methods-use-this
  rules() {
    return {
      name: ['string', 'between:3,50'],
      description: ['string', 'max:100'],
      ownerId: ['integer', 'exists:product_owners,id']
    };
  }
}

module.exports = ProductValidator;
