const BaseValidator = require('../base.validator');

class OrganizationValidator extends BaseValidator {
  // eslint-disable-next-line class-methods-use-this
  rules() {
    return {
      name: ['string', 'between:3,50'],
      bio: ['string', 'max:255']
    };
  }
}

module.exports = OrganizationValidator;
