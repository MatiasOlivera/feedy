const BaseValidator = require('../base.validator');

class IssueValidator extends BaseValidator {
  // eslint-disable-next-line class-methods-use-this
  rules() {
    return {
      title: ['string', 'between:3,50'],
      body: ['string', 'max:255'],
      userId: ['integer', 'exists:users,id'],
      productId: ['integer', 'exists:products,id']
    };
  }
}

module.exports = IssueValidator;
